const db = require('../services/db.service');
const Complaint = require('../models/Complaint');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.ComplaINTs`, // Using the typo from schema
    FIND_BY_ID: `SELECT * FROM ${s}.ComplaINTs WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.ComplaINTs (id, raised_by, flat_id, title, description, status, category, priority, created_at, created_by, updated_at, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.ComplaINTs SET raised_by = ?, flat_id = ?, title = ?, description = ?, status = ?, category = ?, priority = ?, updated_at = ?, updated_by = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.ComplaINTs WHERE id = ?`
};

class ComplaintRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.status) {
            conditions.push('status = ?');
            params.push(filters.status);
        }
        if (filters.category) {
            conditions.push('category = ?');
            params.push(filters.category);
        }
        if (filters.raisedBy) {
            conditions.push('raised_by = ?');
            params.push(filters.raisedBy);
        }
        if (filters.flatId) {
            conditions.push('flat_id = ?');
            params.push(filters.flatId);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const results = await db.query(query, params);
        return results.map(row => new Complaint(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new Complaint(results[0]) : null;
    }

    async create(complaintData) {
        const complaint = new Complaint(complaintData);
        if (!complaint.id) {
            complaint.id = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            complaint.id, complaint.raisedBy, complaint.flatId, complaint.title, complaint.description, complaint.status, complaint.category, complaint.priority, complaint.createdAt, complaint.createdBy, complaint.updatedAt, complaint.updatedBy
        ]);
        return complaint;
    }

    async update(id, updateData, userId = null) {
        const complaint = await this.findById(id);
        if (!complaint) return null;

        const updatedAt = new Date();
        const updatedBy = userId || complaint.updatedBy;

        await db.query(QUERIES.UPDATE, [
            updateData.raisedBy !== undefined ? updateData.raisedBy : complaint.raisedBy,
            updateData.flatId !== undefined ? updateData.flatId : complaint.flatId,
            updateData.title !== undefined ? updateData.title : complaint.title,
            updateData.description !== undefined ? updateData.description : complaint.description,
            updateData.status !== undefined ? updateData.status : complaint.status,
            updateData.category !== undefined ? updateData.category : complaint.category,
            updateData.priority !== undefined ? updateData.priority : complaint.priority,
            updatedAt,
            updatedBy,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id, userId = null) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new ComplaintRepository();
