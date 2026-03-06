const db = require('../services/db.service');
const Notification = require('../models/Notification');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.notifications`,
    FIND_BY_ID: `SELECT * FROM ${s}.notifications WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.notifications (id, society_id, user_id, title, message, notification_type, is_read, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.notifications SET is_read = ? WHERE id = ?`, // usually only is_read changes
    MARK_ALL_READ: `UPDATE ${s}.notifications SET is_read = 1 WHERE user_id = ?`,
    DELETE: `DELETE FROM ${s}.notifications WHERE id = ?`
};

class NotificationRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.userId) {
            conditions.push('user_id = ?');
            params.push(filters.userId);
        }
        if (filters.isRead !== undefined) {
            conditions.push('is_read = ?');
            params.push(filters.isRead ? 1 : 0);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const results = await db.query(query, params);
        return results.map(row => new Notification(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new Notification(results[0]) : null;
    }

    async create(notificationData) {
        const notif = new Notification(notificationData);
        if (!notif.id) {
            notif.id = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            notif.id, notif.societyId, notif.userId, notif.title, notif.message, notif.notificationType, notif.isRead ? 1 : 0, notif.createdAt, notif.createdBy
        ]);
        return notif;
    }

    async update(id, updateData) {
        if (updateData.isRead !== undefined) {
            await db.query(QUERIES.UPDATE, [updateData.isRead ? 1 : 0, id]);
        }
        return await this.findById(id);
    }

    async delete(id) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new NotificationRepository();
