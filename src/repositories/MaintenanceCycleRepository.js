const db = require('../services/db.service');
const MaintenanceCycle = require('../models/MaintenanceCycle');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.MaINTenanceCycles`, // Follow typo from schema
    FIND_BY_ID: `SELECT * FROM ${s}.MaINTenanceCycles WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.MaINTenanceCycles (id, soceity_id, config_id, cycle_month, cycle_year, created_at, created_by, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.MaINTenanceCycles SET soceity_id = ?, config_id = ?, cycle_month = ?, cycle_year = ?, status = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.MaINTenanceCycles WHERE id = ?`
};

class MaintenanceCycleRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.societyId) {
            conditions.push('soceity_id = ?');
            params.push(filters.societyId);
        }
        if (filters.configId) {
            conditions.push('config_id = ?');
            params.push(filters.configId);
        }
        if (filters.cycleYear) {
            conditions.push('cycle_year = ?');
            params.push(filters.cycleYear);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const results = await db.query(query, params);
        return results.map(row => new MaintenanceCycle(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new MaintenanceCycle(results[0]) : null;
    }

    async create(cycleData) {
        const cycle = new MaintenanceCycle(cycleData);
        if (!cycle.id) {
            cycle.id = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            cycle.id, cycle.societyId, cycle.configId, cycle.cycleMonth, cycle.cycleYear, cycle.createdAt, cycle.createdBy, cycle.status
        ]);
        return cycle;
    }

    async update(id, updateData) {
        const cycle = await this.findById(id);
        if (!cycle) return null;

        await db.query(QUERIES.UPDATE, [
            updateData.societyId !== undefined ? updateData.societyId : cycle.societyId,
            updateData.configId !== undefined ? updateData.configId : cycle.configId,
            updateData.cycleMonth !== undefined ? updateData.cycleMonth : cycle.cycleMonth,
            updateData.cycleYear !== undefined ? updateData.cycleYear : cycle.cycleYear,
            updateData.status !== undefined ? updateData.status : cycle.status,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new MaintenanceCycleRepository();
