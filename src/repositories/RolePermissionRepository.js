const db = require('../services/db.service');
const RolePermission = require('../models/RolePermission');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.RolePermissions`,
    FIND_BY_ID: `SELECT * FROM ${s}.RolePermissions WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.RolePermissions (id, role_id, module, permission) VALUES (?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.RolePermissions SET role_id = ?, module = ?, permission = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.RolePermissions WHERE id = ?`
};

class RolePermissionRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.roleId) {
            conditions.push('role_id = ?');
            params.push(filters.roleId);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const results = await db.query(query, params);
        return results.map(row => new RolePermission(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new RolePermission(results[0]) : null;
    }

    async create(rpData) {
        const rolePerm = new RolePermission(rpData);
        if (!rolePerm.id) {
            rolePerm.id = Math.floor(Math.random() * 10000); // SMALLINT
        }
        await db.query(QUERIES.CREATE, [
            rolePerm.id, rolePerm.roleId, rolePerm.module ? 1 : 0, rolePerm.permission
        ]);
        return rolePerm;
    }

    async update(id, updateData) {
        const rolePerm = await this.findById(id);
        if (!rolePerm) return null;

        await db.query(QUERIES.UPDATE, [
            updateData.roleId !== undefined ? updateData.roleId : rolePerm.roleId,
            updateData.module !== undefined ? (updateData.module ? 1 : 0) : rolePerm.module,
            updateData.permission !== undefined ? updateData.permission : rolePerm.permission,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new RolePermissionRepository();
