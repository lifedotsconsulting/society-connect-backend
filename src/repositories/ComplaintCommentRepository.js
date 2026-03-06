const db = require('../services/db.service');
const ComplaintComment = require('../models/ComplaintComment');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.ComplaintComments`,
    FIND_BY_ID: `SELECT * FROM ${s}.ComplaintComments WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.ComplaintComments (id, complaint_id, user_id, comment, parent_comment_id, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.ComplaintComments SET complaint_id = ?, user_id = ?, comment = ?, parent_comment_id = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.ComplaintComments WHERE id = ?`
};

class ComplaintCommentRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.complaintId) {
            conditions.push('complaint_id = ?');
            params.push(filters.complaintId);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY created_at ASC';

        const results = await db.query(query, params);
        return results.map(row => new ComplaintComment(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new ComplaintComment(results[0]) : null;
    }

    async create(commentData) {
        const comment = new ComplaintComment(commentData);
        if (!comment.id) {
            comment.id = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            comment.id, comment.complaintId, comment.userId, comment.comment, comment.parentCommentId, comment.createdAt, comment.createdBy
        ]);
        return comment;
    }

    async update(id, updateData) {
        const commentObj = await this.findById(id);
        if (!commentObj) return null;

        await db.query(QUERIES.UPDATE, [
            updateData.complaintId !== undefined ? updateData.complaintId : commentObj.complaintId,
            updateData.userId !== undefined ? updateData.userId : commentObj.userId,
            updateData.comment !== undefined ? updateData.comment : commentObj.comment,
            updateData.parentCommentId !== undefined ? updateData.parentCommentId : commentObj.parentCommentId,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new ComplaintCommentRepository();
