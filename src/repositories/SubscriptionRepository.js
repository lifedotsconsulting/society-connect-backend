const db = require('../services/db.service');
const Subscription = require('../models/Subscription');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.Subscription`,
    FIND_BY_ID: `SELECT * FROM ${s}.Subscription WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.Subscription (id, society_id, plan_id, billing_cycle, start_date, end_date, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.Subscription SET society_id = ?, plan_id = ?, billing_cycle = ?, start_date = ?, end_date = ?, status = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.Subscription WHERE id = ?`
};

class SubscriptionRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.societyId) {
            conditions.push('society_id = ?');
            params.push(filters.societyId);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const results = await db.query(query, params);
        return results.map(row => new Subscription(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new Subscription(results[0]) : null;
    }

    async create(subData) {
        const sub = new Subscription(subData);
        if (!sub.id) {
            sub.id = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            sub.id, sub.societyId, sub.planId, sub.billingCycle, sub.startDate, sub.endDate, sub.status ? 1 : 0
        ]);
        return sub;
    }

    async update(id, updateData) {
        const sub = await this.findById(id);
        if (!sub) return null;

        await db.query(QUERIES.UPDATE, [
            updateData.societyId !== undefined ? updateData.societyId : sub.societyId,
            updateData.planId !== undefined ? updateData.planId : sub.planId,
            updateData.billingCycle !== undefined ? updateData.billingCycle : sub.billingCycle,
            updateData.startDate !== undefined ? updateData.startDate : sub.startDate,
            updateData.endDate !== undefined ? updateData.endDate : sub.endDate,
            updateData.status !== undefined ? (updateData.status ? 1 : 0) : sub.status,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new SubscriptionRepository();
