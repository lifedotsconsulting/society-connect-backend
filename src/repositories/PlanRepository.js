const db = require('../services/db.service');
const Plan = require('../models/Plan');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.Plans`,
    FIND_BY_ID: `SELECT * FROM ${s}.Plans WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.Plans (id, plan_name, price, max_flats, features_json) VALUES (?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.Plans SET plan_name = ?, price = ?, max_flats = ?, features_json = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.Plans WHERE id = ?`
};

class PlanRepository {
    async findAll() {
        const results = await db.query(QUERIES.FIND_ALL);
        return results.map(row => new Plan(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new Plan(results[0]) : null;
    }

    async create(planData) {
        const plan = new Plan(planData);
        if (!plan.id) {
            plan.id = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            plan.id, plan.planName, plan.price, plan.maxFlats, plan.featuresJson
        ]);
        return plan;
    }

    async update(id, updateData) {
        const plan = await this.findById(id);
        if (!plan) return null;

        await db.query(QUERIES.UPDATE, [
            updateData.planName !== undefined ? updateData.planName : plan.planName,
            updateData.price !== undefined ? updateData.price : plan.price,
            updateData.maxFlats !== undefined ? updateData.maxFlats : plan.maxFlats,
            updateData.featuresJson !== undefined ? updateData.featuresJson : plan.featuresJson,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new PlanRepository();
