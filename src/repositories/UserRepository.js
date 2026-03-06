const db = require('../services/db.service');
const User = require('../models/User');
const config = require('../config');
const s = config.db.schema;

const USER_SOCIETY_SELECT = `
    SELECT u.*, 
        s.id as s_id, s.name as s_name, s.location as s_location, s.address as s_address,
        s.email as s_email, s.phone as s_phone, s.status as s_status, 
        s.registration_number as s_registration_number, s.logo_url as s_logo_url, s.theme as s_theme
    FROM ${s}.Users u
    LEFT JOIN ${s}.Societies s ON u.society_id = s.id
`;

const QUERIES = {
    FIND_ALL: 'SELECT * FROM Users WHERE isActive = 1',
    FIND_BY_ID: `${USER_SOCIETY_SELECT} WHERE u.id = ? AND u.status = 1`,
    CREATE: `INSERT INTO ${s}.Users (id, first_name, last_name, email, username, status, role, society_id, device_id, last_login_at, profile_photo_url, preference, created_at, created_by, updated_at, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.Users SET first_name = ?, last_name = ?, email = ?, username = ?, status = ?, role = ?, society_id = ?, device_id = ?, last_login_at = ?, profile_photo_url = ?, preference = ?, updated_at = ?, updated_by = ? WHERE id = ?`,
    DELETE: `UPDATE ${s}.Users SET status = 0, updated_at = ?, updated_by = ? WHERE id = ?`,
    FIND_BY_USERNAME_AND_PASS: `${USER_SOCIETY_SELECT} WHERE LOWER(u.username) = LOWER(?) AND u.passwordHash = ? AND u.status = 1`,
    UPDATE_DEVICE_ID: `UPDATE ${s}.Users SET device_id = ?, updated_at = NOW() WHERE id = ?`
};

class UserRepository {
    _mapUserRow(row) {
        if (!row) return null;
        var user = new User(row);
        if (row.s_id) {
            user.society = {
                id: row.s_id,
                name: row.s_name,
                location: row.s_location,
                address: row.s_address,
                email: row.s_email,
                phone: row.s_phone,
                status: row.s_status,
                registrationNumber: row.s_registration_number,
                logoUrl: row.s_logo_url,
                theme: row.s_theme
            };
        }
        return user;
    }

    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];

        if (filters.email) {
            query += ' AND email = ?';
            params.push(filters.email);
        }
        if (filters.societyId) {
            query += ' AND society_id = ?';
            params.push(filters.societyId);
        }
        if (filters.role) {
            query += ' AND role = ?';
            params.push(filters.role);
        }

        const results = await db.query(query, params);
        return results.map(row => this._mapUserRow(row));
    }

    async findById(id) {
        // console.log(QUERIES.FIND_BY_ID);
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        //console.log(results);
        return results.length ? this._mapUserRow(results[0]) : null;
    }

    async create(userData) {
        const user = new User(userData);
        if (!user.id) {
            // Can be replaced with crypto.randomUUID() later
            user.id = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            user.id, user.firstName, user.lastName, user.email, user.username, user.status, user.role, (user.society ? user.society.id : (userData.society_id || null)), user.deviceId, user.lastLoginAt, user.profilePhotoUrl, user.preference, user.createdAt, user.createdBy, user.updatedAt, user.updatedBy
        ]);
        return await this.findById(user.id);
    }

    async update(id, updateData, userId = null) {
        const user = await this.findById(id);
        if (!user) return null;

        const updatedAt = new Date();
        const updatedBy = userId || user.updatedBy;

        await db.query(QUERIES.UPDATE, [
            updateData.firstName !== undefined ? updateData.firstName : user.firstName,
            updateData.lastName !== undefined ? updateData.lastName : user.lastName,
            updateData.email !== undefined ? updateData.email : user.email,
            updateData.username !== undefined ? updateData.username : user.username,
            updateData.status !== undefined ? updateData.status : user.status,
            updateData.role !== undefined ? updateData.role : user.role,
            (updateData.society ? updateData.society.id : (updateData.societyId !== undefined ? updateData.societyId : (user.society ? user.society.id : null))),
            updateData.deviceId !== undefined ? updateData.deviceId : user.deviceId,
            updateData.lastLoginAt !== undefined ? updateData.lastLoginAt : user.lastLoginAt,
            updateData.profilePhotoUrl !== undefined ? updateData.profilePhotoUrl : user.profilePhotoUrl,
            updateData.preference !== undefined ? updateData.preference : user.preference,
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

    async findByEmail(email) {
        const users = await this.findAll({ email });
        return users.length > 0 ? users[0] : null;
    }

    async findByUsernameAndPassword(username, passwordHash) {
        // We return the raw DB object here because the auth service needs passwordHash (if returning it)
        // or just return the DB object.
        console.log(QUERIES.FIND_BY_USERNAME_AND_PASS);
        console.log(username, passwordHash);
        const results = await db.query(QUERIES.FIND_BY_USERNAME_AND_PASS, [username, passwordHash]);
        console.log(results);
        return results.length ? this._mapUserRow(results[0]) : null;
    }

    async updateDeviceId(id, deviceId) {
        await db.query(QUERIES.UPDATE_DEVICE_ID, [deviceId, id]);
    }
}

module.exports = new UserRepository();
