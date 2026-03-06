const db = require('../services/db.service');
const FinancialData = require('../models/FinancialData');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.FinancialData`,
    FIND_BY_ID: `SELECT * FROM ${s}.FinancialData WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.FinancialData (id, soceity_id, current_maINTainance_collected, current_maINTainance_pending, cash_reserve, total_expenses, updated_at, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.FinancialData SET soceity_id = ?, current_maINTainance_collected = ?, current_maINTainance_pending = ?, cash_reserve = ?, total_expenses = ?, updated_at = ?, updated_by = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.FinancialData WHERE id = ?`
};

class FinancialDataRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.societyId) {
            conditions.push('soceity_id = ?');
            params.push(filters.societyId);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const results = await db.query(query, params);
        return results.map(row => new FinancialData(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new FinancialData(results[0]) : null;
    }

    async create(finData) {
        const fin = new FinancialData(finData);
        if (!fin.id) {
            fin.id = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            fin.id, fin.societyId, fin.currentMaintenanceCollected, fin.currentMaintenancePending, fin.cashReserve, fin.totalExpenses, fin.updatedAt, fin.updatedBy
        ]);
        return fin;
    }

    async update(id, updateData, userId = null) {
        const fin = await this.findById(id);
        if (!fin) return null;

        const updatedAt = new Date();
        const updatedBy = userId || fin.updatedBy;

        await db.query(QUERIES.UPDATE, [
            updateData.societyId !== undefined ? updateData.societyId : fin.societyId,
            updateData.currentMaintenanceCollected !== undefined ? updateData.currentMaintenanceCollected : fin.currentMaintenanceCollected,
            updateData.currentMaintenancePending !== undefined ? updateData.currentMaintenancePending : fin.currentMaintenancePending,
            updateData.cashReserve !== undefined ? updateData.cashReserve : fin.cashReserve,
            updateData.totalExpenses !== undefined ? updateData.totalExpenses : fin.totalExpenses,
            updatedAt,
            updatedBy,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new FinancialDataRepository();
