const db = require('../services/db.service');
const User = require('../models/User');

const QUERIES = {
    FIND_ALL: 'SELECT * FROM Users WHERE isActive = 1',
    FIND_BY_ID: 'SELECT * FROM Users WHERE identity = ? AND isActive = 1',
    CREATE: 'INSERT INTO Users (identity, description, createdAt, createdBy, updatedAt, updatedBy, isActive, flatNumber, name, role, email, phone, passwordHash, deviceId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    UPDATE: 'UPDATE Users SET description = ?, updatedAt = ?, updatedBy = ?, flatNumber = ?, name = ?, role = ?, email = ?, phone = ?, deviceId = ? WHERE identity = ?',
    DELETE: 'UPDATE Users SET isActive = 0, updatedAt = ?, updatedBy = ? WHERE identity = ?'
};

class UserRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];

        if (filters.email) {
            query += ' AND email = ?';
            params.push(filters.email);
        }
        if (filters.flatNumber) {
            query += ' AND flatNumber = ?';
            params.push(filters.flatNumber);
        }
        if (filters.role) {
            query += ' AND role = ?';
            params.push(filters.role);
        }

        const results = await db.query(query, params);
        return results.map(row => new User(row));
    }

    async findById(identity) {
        console.log('findById', identity);
        const results = await db.query(QUERIES.FIND_BY_ID, [identity]);
        return results.length ? new User(results[0]) : null;
    }

    async create(userData) {
        const user = new User(userData);
        if (!user.identity) {
            user.identity = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            user.identity, user.description, user.createdAt, user.createdBy, user.updatedAt, user.updatedBy, user.isActive ? 1 : 0,
            user.flatNumber, user.name, user.role, user.email, user.phone, user.passwordHash, user.deviceId
        ]);
        return user;
    }

    async update(identity, updateData, userId = null) {
        const user = await this.findById(identity);
        if (!user) return null;

        const updatedAt = new Date();
        const updatedBy = userId || user.updatedBy;

        await db.query(QUERIES.UPDATE, [
            updateData.description !== undefined ? updateData.description : user.description,
            updatedAt,
            updatedBy,
            updateData.flatNumber !== undefined ? updateData.flatNumber : user.flatNumber,
            updateData.name !== undefined ? updateData.name : user.name,
            updateData.role !== undefined ? updateData.role : user.role,
            updateData.email !== undefined ? updateData.email : user.email,
            updateData.phone !== undefined ? updateData.phone : user.phone,
            updateData.deviceId !== undefined ? updateData.deviceId : user.deviceId,
            identity
        ]);

        return await this.findById(identity);
    }

    async delete(identity, userId = null) {
        const updatedAt = new Date();
        await db.query(QUERIES.DELETE, [updatedAt, userId, identity]);
        return true;
    }

    async findByEmail(email) {
        const users = await this.findAll({ email });
        return users.length > 0 ? users[0] : null;
    }

    async findByFlatNumber(flatNumber) {
        const users = await this.findAll({ flatNumber });
        return users.length > 0 ? users[0] : null;
    }
}

module.exports = new UserRepository();
