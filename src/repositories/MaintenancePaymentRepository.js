const db = require('../services/db.service');
const MaintenancePayment = require('../models/MaintenancePayment');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.MaINTenancePayments`, // schema typo
    FIND_BY_ID: `SELECT * FROM ${s}.MaINTenancePayments WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.MaINTenancePayments (id, society_id, bill_id, flat_id, payment_date, payment_method, transaction_ref, amount_paid, payment_status, receipt_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.MaINTenancePayments SET society_id = ?, bill_id = ?, flat_id = ?, payment_date = ?, payment_method = ?, transaction_ref = ?, amount_paid = ?, payment_status = ?, receipt_url = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.MaINTenancePayments WHERE id = ?`
};

class MaintenancePaymentRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.societyId) {
            conditions.push('society_id = ?');
            params.push(filters.societyId);
        }
        if (filters.billId) {
            conditions.push('bill_id = ?');
            params.push(filters.billId);
        }
        if (filters.flatId) {
            conditions.push('flat_id = ?');
            params.push(filters.flatId);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const results = await db.query(query, params);
        return results.map(row => new MaintenancePayment(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new MaintenancePayment(results[0]) : null;
    }

    async create(paymentData) {
        const payment = new MaintenancePayment(paymentData);
        if (!payment.id) {
            payment.id = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            payment.id, payment.societyId, payment.billId, payment.flatId, payment.paymentDate, payment.paymentMethod, payment.transactionRef, payment.amountPaid, payment.paymentStatus, payment.receiptUrl
        ]);
        return payment;
    }

    async update(id, updateData) {
        const payment = await this.findById(id);
        if (!payment) return null;

        await db.query(QUERIES.UPDATE, [
            updateData.societyId !== undefined ? updateData.societyId : payment.societyId,
            updateData.billId !== undefined ? updateData.billId : payment.billId,
            updateData.flatId !== undefined ? updateData.flatId : payment.flatId,
            updateData.paymentDate !== undefined ? updateData.paymentDate : payment.paymentDate,
            updateData.paymentMethod !== undefined ? updateData.paymentMethod : payment.paymentMethod,
            updateData.transactionRef !== undefined ? updateData.transactionRef : payment.transactionRef,
            updateData.amountPaid !== undefined ? updateData.amountPaid : payment.amountPaid,
            updateData.paymentStatus !== undefined ? updateData.paymentStatus : payment.paymentStatus,
            updateData.receiptUrl !== undefined ? updateData.receiptUrl : payment.receiptUrl,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new MaintenancePaymentRepository();
