const db = require('../services/db.service');
const Vehicle = require('../models/Vehicle');

const QUERIES = {
    FIND_ALL: 'SELECT * FROM Vehicles WHERE isActive = 1',
    FIND_BY_ID: 'SELECT * FROM Vehicles WHERE identity = ? AND isActive = 1',
    CREATE: 'INSERT INTO Vehicles (identity, description, createdAt, createdBy, updatedAt, updatedBy, isActive, vehicleNumber, type, make, model, color, ownerUserId, flatNumber, parkingSlot) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    UPDATE: 'UPDATE Vehicles SET description = ?, updatedAt = ?, updatedBy = ?, vehicleNumber = ?, type = ?, make = ?, model = ?, color = ?, ownerUserId = ?, flatNumber = ?, parkingSlot = ? WHERE identity = ?',
    DELETE: 'UPDATE Vehicles SET isActive = 0, updatedAt = ?, updatedBy = ? WHERE identity = ?'
};

class VehicleRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];

        if (filters.type) {
            query += ' AND type = ?';
            params.push(filters.type);
        }
        if (filters.flatNumber) {
            query += ' AND flatNumber = ?';
            params.push(filters.flatNumber);
        }
        if (filters.ownerUserId) {
            query += ' AND ownerUserId = ?';
            params.push(filters.ownerUserId);
        }

        const results = await db.query(query, params);
        return results.map(row => new Vehicle(row));
    }

    async findById(identity) {
        const results = await db.query(QUERIES.FIND_BY_ID, [identity]);
        return results.length ? new Vehicle(results[0]) : null;
    }

    async create(vehicleData) {
        const vehicle = new Vehicle(vehicleData);
        if (!vehicle.identity) {
            vehicle.identity = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            vehicle.identity, vehicle.description, vehicle.createdAt, vehicle.createdBy, vehicle.updatedAt, vehicle.updatedBy, vehicle.isActive ? 1 : 0,
            vehicle.vehicleNumber, vehicle.type, vehicle.make, vehicle.model, vehicle.color, vehicle.ownerUserId, vehicle.flatNumber, vehicle.parkingSlot
        ]);
        return vehicle;
    }

    async update(identity, updateData, userId = null) {
        const vehicle = await this.findById(identity);
        if (!vehicle) return null;

        const updatedAt = new Date();
        const updatedBy = userId || vehicle.updatedBy;

        await db.query(QUERIES.UPDATE, [
            updateData.description !== undefined ? updateData.description : vehicle.description,
            updatedAt,
            updatedBy,
            updateData.vehicleNumber !== undefined ? updateData.vehicleNumber : vehicle.vehicleNumber,
            updateData.type !== undefined ? updateData.type : vehicle.type,
            updateData.make !== undefined ? updateData.make : vehicle.make,
            updateData.model !== undefined ? updateData.model : vehicle.model,
            updateData.color !== undefined ? updateData.color : vehicle.color,
            updateData.ownerUserId !== undefined ? updateData.ownerUserId : vehicle.ownerUserId,
            updateData.flatNumber !== undefined ? updateData.flatNumber : vehicle.flatNumber,
            updateData.parkingSlot !== undefined ? updateData.parkingSlot : vehicle.parkingSlot,
            identity
        ]);

        return await this.findById(identity);
    }

    async delete(identity, userId = null) {
        const updatedAt = new Date();
        await db.query(QUERIES.DELETE, [updatedAt, userId, identity]);
        return true;
    }
}

module.exports = new VehicleRepository();
