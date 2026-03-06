const db = require('../services/db.service');
const MaintenanceLedger = require('../models/MaintenanceLedger');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.MaINTenanceLedger`, // schema typo
    FIND_BY_ID: `SELECT * FROM ${s}.MaINTenanceLedger WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.MaINTenanceLedger (id, society_id, flat_id, bill_id, transaction_type, amount, balance, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.MaINTenanceLedger SET society_id = ?, flat_id = ?, bill_id = ?, transaction_type = ?, amount = ?, balance = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.MaINTenanceLedger WHERE id = ?`
};

class MaintenanceLedgerRepository {
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

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const results = await db.query(query, params);
        return results.map(row => new MaintenanceLedger(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new MaintenanceLedger(results[0]) : null;
    }

    async create(ledgerData) {
        const ledger = new MaintenanceLedger(ledgerData);
        if (!ledger.id) {
            ledger.id = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            ledger.id, ledger.societyId, ledger.flatId, ledger.billId, ledger.transactionType, ledger.amount, ledger.balance, ledger.createdAt, ledger.createdBy
        ]);
        return ledger;
    }

    async update(id, updateData) {
        const ledger = await this.findById(id);
        if (!ledger) return null;

        await db.query(QUERIES.UPDATE, [
            updateData.societyId !== undefined ? updateData.societyId : ledger.societyId,
            updateData.flatId !== undefined ? updateData.flatId : ledger.flatId,
            updateData.billId !== undefined ? updateData.billId : ledger.billId,
            updateData.transactionType !== undefined ? updateData.transactionType : ledger.transactionType,
            updateData.amount !== undefined ? updateData.amount : ledger.amount,
            updateData.balance !== undefined ? updateData.balance : ledger.balance,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new MaintenanceLedgerRepository();
