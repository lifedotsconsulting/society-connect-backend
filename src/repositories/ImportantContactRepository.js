const db = require('../services/db.service');
const ImportantContact = require('../models/ImportantContact');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.important_contacts`,
    FIND_BY_ID: `SELECT * FROM ${s}.important_contacts WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.important_contacts (id, society_id, name, phone, email, category, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.important_contacts SET society_id = ?, name = ?, phone = ?, email = ?, category = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.important_contacts WHERE id = ?`
};

class ImportantContactRepository {
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
        return results.map(row => new ImportantContact(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new ImportantContact(results[0]) : null;
    }

    async create(contactData) {
        const contact = new ImportantContact(contactData);
        if (!contact.id) {
            contact.id = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            contact.id, contact.societyId, contact.name, contact.phone, contact.email, contact.category, contact.createdAt, contact.createdBy
        ]);
        return contact;
    }

    async update(id, updateData) {
        const contact = await this.findById(id);
        if (!contact) return null;

        await db.query(QUERIES.UPDATE, [
            updateData.societyId !== undefined ? updateData.societyId : contact.societyId,
            updateData.name !== undefined ? updateData.name : contact.name,
            updateData.phone !== undefined ? updateData.phone : contact.phone,
            updateData.email !== undefined ? updateData.email : contact.email,
            updateData.category !== undefined ? updateData.category : contact.category,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new ImportantContactRepository();
