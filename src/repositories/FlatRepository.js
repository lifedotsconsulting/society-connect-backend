const db = require('../services/db.service');
const Flat = require('../models/Flat');

const QUERIES = {
    FIND_ALL: 'SELECT * FROM Flats WHERE isActive = 1',
    FIND_BY_ID: 'SELECT * FROM Flats WHERE identity = ? AND isActive = 1',
    CREATE: 'INSERT INTO Flats (identity, description, createdAt, createdBy, updatedAt, updatedBy, isActive, flatNumber, block, floor, bhk, occupancyStatus, currentResidentId, ownerId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    UPDATE: 'UPDATE Flats SET description = ?, updatedAt = ?, updatedBy = ?, flatNumber = ?, block = ?, floor = ?, bhk = ?, occupancyStatus = ?, currentResidentId = ?, ownerId = ? WHERE identity = ?',
    DELETE: 'UPDATE Flats SET isActive = 0, updatedAt = ?, updatedBy = ? WHERE identity = ?'
};

class FlatRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];

        if (filters.block) {
            query += ' AND block = ?';
            params.push(filters.block);
        }
        if (filters.floor) {
            query += ' AND floor = ?';
            params.push(filters.floor);
        }
        if (filters.occupancyStatus) {
            query += ' AND occupancyStatus = ?';
            params.push(filters.occupancyStatus);
        }

        const results = await db.query(query, params);
        return results.map(row => new Flat(row));
    }

    async findById(identity) {
        const results = await db.query(QUERIES.FIND_BY_ID, [identity]);
        return results.length ? new Flat(results[0]) : null;
    }

    async create(flatData) {
        const flat = new Flat(flatData);
        if (!flat.identity) {
            flat.identity = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            flat.identity, flat.description, flat.createdAt, flat.createdBy, flat.updatedAt, flat.updatedBy, flat.isActive ? 1 : 0,
            flat.flatNumber, flat.block, flat.floor, flat.bhk, flat.occupancyStatus, flat.currentResidentId, flat.ownerId
        ]);
        return flat;
    }

    async update(identity, updateData, userId = null) {
        const flat = await this.findById(identity);
        if (!flat) return null;

        const updatedAt = new Date();
        const updatedBy = userId || flat.updatedBy;

        await db.query(QUERIES.UPDATE, [
            updateData.description !== undefined ? updateData.description : flat.description,
            updatedAt,
            updatedBy,
            updateData.flatNumber !== undefined ? updateData.flatNumber : flat.flatNumber,
            updateData.block !== undefined ? updateData.block : flat.block,
            updateData.floor !== undefined ? updateData.floor : flat.floor,
            updateData.bhk !== undefined ? updateData.bhk : flat.bhk,
            updateData.occupancyStatus !== undefined ? updateData.occupancyStatus : flat.occupancyStatus,
            updateData.currentResidentId !== undefined ? updateData.currentResidentId : flat.currentResidentId,
            updateData.ownerId !== undefined ? updateData.ownerId : flat.ownerId,
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

module.exports = new FlatRepository();
