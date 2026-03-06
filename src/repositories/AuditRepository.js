const db = require('../services/db.service');
const Audit = require('../models/Audit');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.Audits`,
    FIND_BY_ID: `SELECT * FROM ${s}.Audits WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.Audits (id, society_id, user_id, entity_type, entity_id, action, old_value, new_value, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    // Usually we don't update or delete audits
};

class AuditRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.societyId) {
            conditions.push('society_id = ?');
            params.push(filters.societyId);
        }
        if (filters.entityType) {
            conditions.push('entity_type = ?');
            params.push(filters.entityType);
        }
        if (filters.entityId) {
            conditions.push('entity_id = ?');
            params.push(filters.entityId);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY created_at DESC';

        const results = await db.query(query, params);
        return results.map(row => new Audit(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new Audit(results[0]) : null;
    }

    async create(auditData) {
        const audit = new Audit(auditData);
        if (!audit.id) {
            audit.id = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            audit.id, audit.societyId, audit.userId, audit.entityType, audit.entityId, audit.action, audit.oldValue, audit.newValue, audit.createdAt, audit.createdBy
        ]);
        return audit;
    }
}

module.exports = new AuditRepository();
