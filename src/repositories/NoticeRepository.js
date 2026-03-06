const db = require('../services/db.service');
const Notice = require('../models/Notice');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.notices`,
    FIND_BY_ID: `SELECT * FROM ${s}.notices WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.notices (id, society_id, title, description, attachment_url, publish_date, expiry_date, category, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.notices SET society_id = ?, title = ?, description = ?, attachment_url = ?, publish_date = ?, expiry_date = ?, category = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.notices WHERE id = ?`
};

class NoticeRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.societyId) {
            conditions.push('society_id = ?');
            params.push(filters.societyId);
        }
        if (filters.category) {
            conditions.push('category = ?');
            params.push(filters.category);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const results = await db.query(query, params);
        return results.map(row => new Notice(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new Notice(results[0]) : null;
    }

    async create(noticeData) {
        const notice = new Notice(noticeData);
        if (!notice.id) {
            notice.id = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            notice.id, notice.societyId, notice.title, notice.description, notice.attachmentUrl, notice.publishDate, notice.expiryDate, notice.category, notice.createdAt, notice.createdBy
        ]);
        return notice;
    }

    async update(id, updateData) {
        const notice = await this.findById(id);
        if (!notice) return null;

        await db.query(QUERIES.UPDATE, [
            updateData.societyId !== undefined ? updateData.societyId : notice.societyId,
            updateData.title !== undefined ? updateData.title : notice.title,
            updateData.description !== undefined ? updateData.description : notice.description,
            updateData.attachmentUrl !== undefined ? updateData.attachmentUrl : notice.attachmentUrl,
            updateData.publishDate !== undefined ? updateData.publishDate : notice.publishDate,
            updateData.expiryDate !== undefined ? updateData.expiryDate : notice.expiryDate,
            updateData.category !== undefined ? updateData.category : notice.category,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new NoticeRepository();
