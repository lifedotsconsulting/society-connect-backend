const db = require('../services/db.service');
const Event = require('../models/Event');

const QUERIES = {
    FIND_ALL: 'SELECT * FROM Events WHERE isActive = 1',
    FIND_BY_ID: 'SELECT * FROM Events WHERE identity = ? AND isActive = 1',
    CREATE: 'INSERT INTO Events (identity, description, createdAt, createdBy, updatedAt, updatedBy, isActive, title, eventDate, endDate, location, organizer, category, isPublished) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    UPDATE: 'UPDATE Events SET description = ?, updatedAt = ?, updatedBy = ?, title = ?, eventDate = ?, endDate = ?, location = ?, organizer = ?, category = ?, isPublished = ? WHERE identity = ?',
    DELETE: 'UPDATE Events SET isActive = 0, updatedAt = ?, updatedBy = ? WHERE identity = ?'
};

class EventRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];

        if (filters.category) {
            query += ' AND category = ?';
            params.push(filters.category);
        }
        if (filters.isPublished !== undefined) {
            query += ' AND isPublished = ?';
            params.push(filters.isPublished);
        }

        const results = await db.query(query, params);
        return results.map(row => new Event(row));
    }

    async findById(identity) {
        const results = await db.query(QUERIES.FIND_BY_ID, [identity]);
        return results.length ? new Event(results[0]) : null;
    }

    async create(eventData) {
        const event = new Event(eventData);
        if (!event.identity) {
            event.identity = Math.random().toString(36).substring(2, 10);
        }
        await db.query(QUERIES.CREATE, [
            event.identity, event.description, event.createdAt, event.createdBy, event.updatedAt, event.updatedBy, event.isActive ? 1 : 0,
            event.title, event.eventDate, event.endDate, event.location, event.organizer, event.category, event.isPublished ? 1 : 0
        ]);
        return event;
    }

    async update(identity, updateData, userId = null) {
        const event = await this.findById(identity);
        if (!event) return null;

        const updatedAt = new Date();
        const updatedBy = userId || event.updatedBy;

        await db.query(QUERIES.UPDATE, [
            updateData.description !== undefined ? updateData.description : event.description,
            updatedAt,
            updatedBy,
            updateData.title !== undefined ? updateData.title : event.title,
            updateData.eventDate !== undefined ? updateData.eventDate : event.eventDate,
            updateData.endDate !== undefined ? updateData.endDate : event.endDate,
            updateData.location !== undefined ? updateData.location : event.location,
            updateData.organizer !== undefined ? updateData.organizer : event.organizer,
            updateData.category !== undefined ? updateData.category : event.category,
            updateData.isPublished !== undefined ? (updateData.isPublished ? 1 : 0) : event.isPublished,
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

module.exports = new EventRepository();
