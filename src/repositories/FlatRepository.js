const db = require('../services/db.service');
const Flat = require('../models/Flat');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.Flats`,
    FIND_BY_ID: `SELECT * FROM ${s}.Flats WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.Flats (id, number, block, floor, size, occupancy_status, current_resident, owner_id, description, created_at, created_by, updated_at, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.Flats SET number = ?, block = ?, floor = ?, size = ?, occupancy_status = ?, current_resident = ?, owner_id = ?, description = ?, updated_at = ?, updated_by = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.Flats WHERE id = ?`
};

class FlatRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.block) {
            conditions.push('block = ?');
            params.push(filters.block);
        }
        if (filters.occupancyStatus) {
            conditions.push('occupancy_status = ?');
            params.push(filters.occupancyStatus);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const results = await db.query(query, params);
        return results.map(row => new Flat(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new Flat(results[0]) : null;
    }

    async create(flatData) {
        const flat = new Flat(flatData);
        if (!flat.id) {
            flat.id = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            flat.id, flat.number, flat.block, flat.floor, flat.size, flat.occupancyStatus, flat.currentResident, flat.ownerId, flat.description, flat.createdAt, flat.createdBy, flat.updatedAt, flat.updatedBy
        ]);
        return flat;
    }

    async update(id, updateData, userId = null) {
        const flat = await this.findById(id);
        if (!flat) return null;

        const updatedAt = new Date();
        const updatedBy = userId || flat.updatedBy;

        await db.query(QUERIES.UPDATE, [
            updateData.number !== undefined ? updateData.number : flat.number,
            updateData.block !== undefined ? updateData.block : flat.block,
            updateData.floor !== undefined ? updateData.floor : flat.floor,
            updateData.size !== undefined ? updateData.size : flat.size,
            updateData.occupancyStatus !== undefined ? updateData.occupancyStatus : flat.occupancyStatus,
            updateData.currentResident !== undefined ? updateData.currentResident : flat.currentResident,
            updateData.ownerId !== undefined ? updateData.ownerId : flat.ownerId,
            updateData.description !== undefined ? updateData.description : flat.description,
            updatedAt,
            updatedBy,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id, userId = null) {
        // Hard delete as no status column exists for Flats in schema.sql
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new FlatRepository();
