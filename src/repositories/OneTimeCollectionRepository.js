const db = require('../services/db.service');
const OneTimeCollection = require('../models/OneTimeCollection');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.OneTimeCollection`,
    FIND_BY_ID: `SELECT * FROM ${s}.OneTimeCollection WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.OneTimeCollection (id, society_id, title, description, collection_type, total_target_amount, per_flat_amount, calculation_method, due_date, late_fee, late_fee_grace_days, status, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.OneTimeCollection SET society_id = ?, title = ?, description = ?, collection_type = ?, total_target_amount = ?, per_flat_amount = ?, calculation_method = ?, due_date = ?, late_fee = ?, late_fee_grace_days = ?, status = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.OneTimeCollection WHERE id = ?`
};

class OneTimeCollectionRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.societyId) {
            conditions.push('society_id = ?');
            params.push(filters.societyId);
        }
        if (filters.status !== undefined) {
            conditions.push('status = ?');
            params.push(filters.status);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const results = await db.query(query, params);
        return results.map(row => new OneTimeCollection(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new OneTimeCollection(results[0]) : null;
    }

    async create(otcData) {
        const otc = new OneTimeCollection(otcData);
        if (!otc.id) {
            otc.id = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            otc.id, otc.societyId, otc.title, otc.description, otc.collectionType, otc.totalTargetAmount, otc.perFlatAmount, otc.calculationMethod, otc.dueDate, otc.lateFee, otc.lateFeeGraceDays, otc.status, otc.createdAt, otc.createdBy
        ]);
        return otc;
    }

    async update(id, updateData) {
        const otc = await this.findById(id);
        if (!otc) return null;

        await db.query(QUERIES.UPDATE, [
            updateData.societyId !== undefined ? updateData.societyId : otc.societyId,
            updateData.title !== undefined ? updateData.title : otc.title,
            updateData.description !== undefined ? updateData.description : otc.description,
            updateData.collectionType !== undefined ? updateData.collectionType : otc.collectionType,
            updateData.totalTargetAmount !== undefined ? updateData.totalTargetAmount : otc.totalTargetAmount,
            updateData.perFlatAmount !== undefined ? updateData.perFlatAmount : otc.perFlatAmount,
            updateData.calculationMethod !== undefined ? updateData.calculationMethod : otc.calculationMethod,
            updateData.dueDate !== undefined ? updateData.dueDate : otc.dueDate,
            updateData.lateFee !== undefined ? updateData.lateFee : otc.lateFee,
            updateData.lateFeeGraceDays !== undefined ? updateData.lateFeeGraceDays : otc.lateFeeGraceDays,
            updateData.status !== undefined ? updateData.status : otc.status,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new OneTimeCollectionRepository();
