const db = require('../services/db.service');
const Document = require('../models/Document');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.documents`,
    FIND_BY_ID: `SELECT * FROM ${s}.documents WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.documents (id, society_id, title, document_type, file_url, uploaded_by, uploaded_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.documents SET society_id = ?, title = ?, document_type = ?, file_url = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.documents WHERE id = ?`
};

class DocumentRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.societyId) {
            conditions.push('society_id = ?');
            params.push(filters.societyId);
        }
        if (filters.documentType) {
            conditions.push('document_type = ?');
            params.push(filters.documentType);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const results = await db.query(query, params);
        return results.map(row => new Document(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new Document(results[0]) : null;
    }

    async create(docData) {
        const doc = new Document(docData);
        if (!doc.id) {
            doc.id = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            doc.id, doc.societyId, doc.title, doc.documentType, doc.fileUrl, doc.createdBy, doc.createdAt
        ]);
        return doc;
    }

    async update(id, updateData) {
        const doc = await this.findById(id);
        if (!doc) return null;

        await db.query(QUERIES.UPDATE, [
            updateData.societyId !== undefined ? updateData.societyId : doc.societyId,
            updateData.title !== undefined ? updateData.title : doc.title,
            updateData.documentType !== undefined ? updateData.documentType : doc.documentType,
            updateData.fileUrl !== undefined ? updateData.fileUrl : doc.fileUrl,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new DocumentRepository();
