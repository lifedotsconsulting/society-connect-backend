const db = require('../services/db.service');
const Society = require('../models/Society');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.Societies`,
    FIND_BY_ID: `SELECT * FROM ${s}.Societies WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.Societies (id, name, location, address, email, phone, description, status, registration_number, logo_url, theme, created_at, created_by, updated_at, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.Societies SET name = ?, location = ?, address = ?, email = ?, phone = ?, description = ?, status = ?, registration_number = ?, logo_url = ?, theme = ?, updated_at = ?, updated_by = ? WHERE id = ?`,
    DELETE: `UPDATE ${s}.Societies SET status = 0, updated_at = ?, updated_by = ? WHERE id = ?`
};

class SocietyRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.status !== undefined) {
            conditions.push('status = ?');
            params.push(filters.status);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const results = await db.query(query, params);
        return results.map(row => new Society(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new Society(results[0]) : null;
    }

    async create(societyData) {
        const society = new Society(societyData);
        if (!society.id) {
            society.id = Math.random().toString(36).substring(2, 10); // temporary UUID mock
        }
        await db.query(QUERIES.CREATE, [
            society.id, society.name, society.location, society.address, society.email, society.phone, society.description, society.status, society.registrationNumber, society.logoUrl, society.theme, society.createdAt, society.createdBy, society.updatedAt, society.updatedBy
        ]);
        return society;
    }

    async update(id, updateData, userId = null) {
        const society = await this.findById(id);
        if (!society) return null;

        const updatedAt = new Date();
        const updatedBy = userId || society.updatedBy;

        await db.query(QUERIES.UPDATE, [
            updateData.name !== undefined ? updateData.name : society.name,
            updateData.location !== undefined ? updateData.location : society.location,
            updateData.address !== undefined ? updateData.address : society.address,
            updateData.email !== undefined ? updateData.email : society.email,
            updateData.phone !== undefined ? updateData.phone : society.phone,
            updateData.description !== undefined ? updateData.description : society.description,
            updateData.status !== undefined ? updateData.status : society.status,
            updateData.registrationNumber !== undefined ? updateData.registrationNumber : society.registrationNumber,
            updateData.logoUrl !== undefined ? updateData.logoUrl : society.logoUrl,
            updateData.theme !== undefined ? updateData.theme : society.theme,
            updatedAt,
            updatedBy,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id, userId = null) {
        const updatedAt = new Date();
        await db.query(QUERIES.DELETE, [updatedAt, userId, id]);
        return true;
    }
}

module.exports = new SocietyRepository();
