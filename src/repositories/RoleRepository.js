const db = require('../services/db.service');
const Role = require('../models/Role');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.Roles`,
    FIND_BY_ID: `SELECT * FROM ${s}.Roles WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.Roles (id, name, is_default, society_id, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.Roles SET name = ?, is_default = ?, society_id = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.Roles WHERE id = ?`
};

class RoleRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.societyId) {
            conditions.push('society_id = ?');
            params.push(filters.societyId);
        }
        if (filters.isDefault !== undefined) {
            conditions.push('is_default = ?');
            params.push(filters.isDefault ? 1 : 0);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const results = await db.query(query, params);
        return results.map(row => new Role(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new Role(results[0]) : null;
    }

    async create(roleData) {
        const role = new Role(roleData);
        if (!role.id) {
            role.id = Math.floor(Math.random() * 10000); // SMALLINT
        }
        await db.query(QUERIES.CREATE, [
            role.id, role.name, role.isDefault ? 1 : 0, role.societyId, role.createdAt, role.createdBy
        ]);
        return role;
    }

    async update(id, updateData) {
        const role = await this.findById(id);
        if (!role) return null;

        await db.query(QUERIES.UPDATE, [
            updateData.name !== undefined ? updateData.name : role.name,
            updateData.isDefault !== undefined ? (updateData.isDefault ? 1 : 0) : role.isDefault,
            updateData.societyId !== undefined ? updateData.societyId : role.societyId,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new RoleRepository();
