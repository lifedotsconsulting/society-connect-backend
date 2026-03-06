const db = require('../services/db.service');
const MaintenanceConfig = require('../models/MaintenanceConfig');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.MaintainceConfigs`, // Keep typo here matching schema
    FIND_BY_ID: `SELECT * FROM ${s}.MaintainceConfigs WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.MaintainceConfigs (id, soceity_id, billing_cycle, calculation_method, amount, amount_per_sqft, late_fee, late_fee_grace_days, due_day_of_month, start_date, end_date, is_active, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.MaintainceConfigs SET soceity_id = ?, billing_cycle = ?, calculation_method = ?, amount = ?, amount_per_sqft = ?, late_fee = ?, late_fee_grace_days = ?, due_day_of_month = ?, start_date = ?, end_date = ?, is_active = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.MaintainceConfigs WHERE id = ?`
};

class MaintenanceConfigRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.societyId) {
            conditions.push('soceity_id = ?');
            params.push(filters.societyId);
        }
        if (filters.isActive !== undefined) {
            conditions.push('is_active = ?');
            params.push(filters.isActive ? 1 : 0);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const results = await db.query(query, params);
        return results.map(row => new MaintenanceConfig(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new MaintenanceConfig(results[0]) : null;
    }

    async create(configData) {
        const config = new MaintenanceConfig(configData);
        if (!config.id) {
            config.id = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            config.id, config.societyId, config.billingCycle, config.calculationMethod, config.amount, config.amountPerSqft, config.lateFee, config.lateFeeGraceDays, config.dueDayOfMonth, config.startDate, config.endDate, config.isActive ? 1 : 0, config.createdAt, config.createdBy
        ]);
        return config;
    }

    async update(id, updateData) {
        const config = await this.findById(id);
        if (!config) return null;

        await db.query(QUERIES.UPDATE, [
            updateData.societyId !== undefined ? updateData.societyId : config.societyId,
            updateData.billingCycle !== undefined ? updateData.billingCycle : config.billingCycle,
            updateData.calculationMethod !== undefined ? updateData.calculationMethod : config.calculationMethod,
            updateData.amount !== undefined ? updateData.amount : config.amount,
            updateData.amountPerSqft !== undefined ? updateData.amountPerSqft : config.amountPerSqft,
            updateData.lateFee !== undefined ? updateData.lateFee : config.lateFee,
            updateData.lateFeeGraceDays !== undefined ? updateData.lateFeeGraceDays : config.lateFeeGraceDays,
            updateData.dueDayOfMonth !== undefined ? updateData.dueDayOfMonth : config.dueDayOfMonth,
            updateData.startDate !== undefined ? updateData.startDate : config.startDate,
            updateData.endDate !== undefined ? updateData.endDate : config.endDate,
            updateData.isActive !== undefined ? (updateData.isActive ? 1 : 0) : config.isActive,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new MaintenanceConfigRepository();
