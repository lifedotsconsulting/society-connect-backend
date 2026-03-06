const db = require('../services/db.service');
const ComplaintCategory = require('../models/ComplaintCategory');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.ComplaintCategories`,
    FIND_BY_ID: `SELECT * FROM ${s}.ComplaintCategories WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.ComplaintCategories (id, title, society_id, description, is_active, created_at, created_by, templates) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.ComplaintCategories SET title = ?, society_id = ?, description = ?, is_active = ?, templates = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.ComplaintCategories WHERE id = ?`
};

class ComplaintCategoryRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.societyId) {
            conditions.push('society_id = ?');
            params.push(filters.societyId);
        }
        if (filters.isActive !== undefined) {
            conditions.push('is_active = ?');
            params.push(filters.isActive ? 1 : 0);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const results = await db.query(query, params);
        return results.map(row => new ComplaintCategory(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new ComplaintCategory(results[0]) : null;
    }

    async create(categoryData) {
        const category = new ComplaintCategory(categoryData);
        if (!category.id) {
            category.id = Math.floor(Math.random() * 1000000); // Integer ID according to schema
        }
        await db.query(QUERIES.CREATE, [
            category.id, category.title, category.societyId, category.description, category.isActive ? 1 : 0, category.createdAt, category.createdBy, category.templates
        ]);
        return category;
    }

    async update(id, updateData) {
        const category = await this.findById(id);
        if (!category) return null;

        await db.query(QUERIES.UPDATE, [
            updateData.title !== undefined ? updateData.title : category.title,
            updateData.societyId !== undefined ? updateData.societyId : category.societyId,
            updateData.description !== undefined ? updateData.description : category.description,
            updateData.isActive !== undefined ? (updateData.isActive ? 1 : 0) : category.isActive,
            updateData.templates !== undefined ? updateData.templates : category.templates,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new ComplaintCategoryRepository();
