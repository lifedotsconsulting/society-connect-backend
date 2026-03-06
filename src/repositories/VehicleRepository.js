const db = require('../services/db.service');
const Vehicle = require('../models/Vehicle');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.Vehicles`,
    FIND_BY_ID: `SELECT * FROM ${s}.Vehicles WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.Vehicles (id, registration_numner, type, model, photo_url, owner_id, parking_slot, created_at, created_by, updated_at, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.Vehicles SET registration_numner = ?, type = ?, model = ?, photo_url = ?, owner_id = ?, parking_slot = ?, updated_at = ?, updated_by = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.Vehicles WHERE id = ?`
};

class VehicleRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.type) {
            conditions.push('type = ?');
            params.push(filters.type);
        }
        if (filters.ownerId) {
            conditions.push('owner_id = ?');
            params.push(filters.ownerId);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const results = await db.query(query, params);
        return results.map(row => new Vehicle(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new Vehicle(results[0]) : null;
    }

    async create(vehicleData) {
        const vehicle = new Vehicle(vehicleData);
        if (!vehicle.id) {
            vehicle.id = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            vehicle.id, vehicle.registrationNumner, vehicle.type, vehicle.model, vehicle.photoUrl, vehicle.ownerId, vehicle.parkingSlot, vehicle.createdAt, vehicle.createdBy, vehicle.updatedAt, vehicle.updatedBy
        ]);
        return vehicle;
    }

    async update(id, updateData, userId = null) {
        const vehicle = await this.findById(id);
        if (!vehicle) return null;

        const updatedAt = new Date();
        const updatedBy = userId || vehicle.updatedBy;

        await db.query(QUERIES.UPDATE, [
            updateData.registrationNumner !== undefined ? updateData.registrationNumner : vehicle.registrationNumner,
            updateData.type !== undefined ? updateData.type : vehicle.type,
            updateData.model !== undefined ? updateData.model : vehicle.model,
            updateData.photoUrl !== undefined ? updateData.photoUrl : vehicle.photoUrl,
            updateData.ownerId !== undefined ? updateData.ownerId : vehicle.ownerId,
            updateData.parkingSlot !== undefined ? updateData.parkingSlot : vehicle.parkingSlot,
            updatedAt,
            updatedBy,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id, userId = null) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new VehicleRepository();
