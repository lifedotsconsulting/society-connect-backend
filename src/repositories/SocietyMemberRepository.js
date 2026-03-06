const db = require('../services/db.service');
const SocietyMember = require('../models/SocietyMember');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.SoceityMembers LEFT JOIN ${s}.Users ON soceitymembers.user_id = society_hood.Users.id `,
    FIND_BY_ID: `SELECT * FROM ${s}.SoceityMembers WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.SoceityMembers (id, user_id, society_id, flat_id, role, created_at, created_by, updated_at, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.SoceityMembers SET user_id = ?, society_id = ?, flat_id = ?, role = ?, updated_at = ?, updated_by = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.SoceityMembers WHERE id = ?`
};

class SocietyMemberRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.userId) {
            conditions.push('user_id = ?');
            params.push(filters.userId);
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
        return results.map(row => new SocietyMember(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new SocietyMember(results[0]) : null;
    }

    async create(memberData) {
        const member = new SocietyMember(memberData);
        if (!member.id) {
            member.id = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            member.id, member.userId, member.societyId, member.flatId, member.role, member.createdAt, member.createdBy, member.updatedAt, member.updatedBy
        ]);
        return member;
    }

    async update(id, updateData, userId = null) {
        const member = await this.findById(id);
        if (!member) return null;

        const updatedAt = new Date();
        const updatedBy = userId || member.updatedBy;

        await db.query(QUERIES.UPDATE, [
            updateData.userId !== undefined ? updateData.userId : member.userId,
            updateData.societyId !== undefined ? updateData.societyId : member.societyId,
            updateData.flatId !== undefined ? updateData.flatId : member.flatId,
            updateData.role !== undefined ? updateData.role : member.role,
            updatedAt,
            updatedBy,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new SocietyMemberRepository();
