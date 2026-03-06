const db = require('../services/db.service');
const MaintenanceBill = require('../models/MaintenanceBill');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.MaINTenanceBills`, // Follow schema typo
    FIND_BY_ID: `SELECT * FROM ${s}.MaINTenanceBills WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.MaINTenanceBills (id, society_id, flat_id, cycle_id, base_amount, penalty_amount, discount_amount, total_amount, due_date, status, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.MaINTenanceBills SET society_id = ?, flat_id = ?, cycle_id = ?, base_amount = ?, penalty_amount = ?, discount_amount = ?, total_amount = ?, due_date = ?, status = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.MaINTenanceBills WHERE id = ?`
};

class MaintenanceBillRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.societyId) {
            conditions.push('society_id = ?');
            params.push(filters.societyId);
        }
        if (filters.flatId) {
            conditions.push('flat_id = ?');
            params.push(filters.flatId);
        }
        if (filters.cycleId) {
            conditions.push('cycle_id = ?');
            params.push(filters.cycleId);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const results = await db.query(query, params);
        return results.map(row => new MaintenanceBill(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new MaintenanceBill(results[0]) : null;
    }

    async create(billData) {
        const bill = new MaintenanceBill(billData);
        if (!bill.id) {
            bill.id = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            bill.id, bill.societyId, bill.flatId, bill.cycleId, bill.baseAmount, bill.penaltyAmount, bill.discountAmount, bill.totalAmount, bill.dueDate, bill.status, bill.createdAt, bill.createdBy
        ]);
        return bill;
    }

    async update(id, updateData) {
        const bill = await this.findById(id);
        if (!bill) return null;

        await db.query(QUERIES.UPDATE, [
            updateData.societyId !== undefined ? updateData.societyId : bill.societyId,
            updateData.flatId !== undefined ? updateData.flatId : bill.flatId,
            updateData.cycleId !== undefined ? updateData.cycleId : bill.cycleId,
            updateData.baseAmount !== undefined ? updateData.baseAmount : bill.baseAmount,
            updateData.penaltyAmount !== undefined ? updateData.penaltyAmount : bill.penaltyAmount,
            updateData.discountAmount !== undefined ? updateData.discountAmount : bill.discountAmount,
            updateData.totalAmount !== undefined ? updateData.totalAmount : bill.totalAmount,
            updateData.dueDate !== undefined ? updateData.dueDate : bill.dueDate,
            updateData.status !== undefined ? updateData.status : bill.status,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new MaintenanceBillRepository();
