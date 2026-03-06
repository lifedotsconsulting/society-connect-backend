const db = require('../services/db.service');
const OneTimeCollectionFlat = require('../models/OneTimeCollectionFlat');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.OneTimeCollectionFlats`,
    FIND_BY_ID: `SELECT * FROM ${s}.OneTimeCollectionFlats WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.OneTimeCollectionFlats (id, collection_id, society_id, flat_id, amount, penalty_amount, discount_amount, amount_paid, total_amount, due_date, status, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.OneTimeCollectionFlats SET collection_id = ?, society_id = ?, flat_id = ?, amount = ?, penalty_amount = ?, discount_amount = ?, amount_paid = ?, total_amount = ?, due_date = ?, status = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.OneTimeCollectionFlats WHERE id = ?`
};

class OneTimeCollectionFlatRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.collectionId) {
            conditions.push('collection_id = ?');
            params.push(filters.collectionId);
        }
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
        return results.map(row => new OneTimeCollectionFlat(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new OneTimeCollectionFlat(results[0]) : null;
    }

    async create(otcfData) {
        const otcf = new OneTimeCollectionFlat(otcfData);
        if (!otcf.id) {
            otcf.id = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            otcf.id, otcf.collectionId, otcf.societyId, otcf.flatId, otcf.amount, otcf.penaltyAmount, otcf.discountAmount, otcf.amountPaid, otcf.totalAmount, otcf.dueDate, otcf.status, otcf.createdAt, otcf.createdBy
        ]);
        return otcf;
    }

    async update(id, updateData) {
        const otcf = await this.findById(id);
        if (!otcf) return null;

        await db.query(QUERIES.UPDATE, [
            updateData.collectionId !== undefined ? updateData.collectionId : otcf.collectionId,
            updateData.societyId !== undefined ? updateData.societyId : otcf.societyId,
            updateData.flatId !== undefined ? updateData.flatId : otcf.flatId,
            updateData.amount !== undefined ? updateData.amount : otcf.amount,
            updateData.penaltyAmount !== undefined ? updateData.penaltyAmount : otcf.penaltyAmount,
            updateData.discountAmount !== undefined ? updateData.discountAmount : otcf.discountAmount,
            updateData.amountPaid !== undefined ? updateData.amountPaid : otcf.amountPaid,
            updateData.totalAmount !== undefined ? updateData.totalAmount : otcf.totalAmount,
            updateData.dueDate !== undefined ? updateData.dueDate : otcf.dueDate,
            updateData.status !== undefined ? updateData.status : otcf.status,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new OneTimeCollectionFlatRepository();
