const db = require('../services/db.service');
const Event = require('../models/Event');
const config = require('../config');
const s = config.db.schema;

const QUERIES = {
    FIND_ALL: `SELECT * FROM ${s}.Events`,
    FIND_BY_ID: `SELECT * FROM ${s}.Events WHERE id = ?`,
    CREATE: `INSERT INTO ${s}.Events (id, society_id, category_id, title, description, event_type, start_datetime, end_datetime, location, max_participants, registration_required, ticket_price, status, memebrs, created_by, created_at, updated_at, attachment_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    UPDATE: `UPDATE ${s}.Events SET society_id = ?, category_id = ?, title = ?, description = ?, event_type = ?, start_datetime = ?, end_datetime = ?, location = ?, max_participants = ?, registration_required = ?, ticket_price = ?, status = ?, memebrs = ?, updated_at = ?, attachment_url = ? WHERE id = ?`,
    DELETE: `DELETE FROM ${s}.Events WHERE id = ?` // Assuming delete if no status used for soft delete, or we can use status = 0
};

class EventRepository {
    async findAll(filters = {}) {
        let query = QUERIES.FIND_ALL;
        const params = [];
        let conditions = [];

        if (filters.societyId) {
            conditions.push('society_id = ?');
            params.push(filters.societyId);
        }
        if (filters.status !== undefined) {
            conditions.push('status = ?');
            params.push(filters.status);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const results = await db.query(query, params);
        return results.map(row => new Event(row));
    }

    async findById(id) {
        const results = await db.query(QUERIES.FIND_BY_ID, [id]);
        return results.length ? new Event(results[0]) : null;
    }

    async create(eventData) {
        const event = new Event(eventData);
        if (!event.id) {
            // Generating integer ID roughly as Events id is INTEGER according to schema... wait, math random is string.
            // Let's use a huge timestamp int.
            event.id = Math.floor(Date.now() / 1000);
        }
        await db.query(QUERIES.CREATE, [
            event.id, event.societyId, event.categoryId, event.title, event.description, event.eventType, event.startDatetime, event.endDatetime, event.location, event.maxParticipants, event.registrationRequired ? 1 : 0, event.ticketPrice, event.status, event.members, event.createdBy, event.createdAt, event.updatedAt, event.attachmentUrl
        ]);
        return event;
    }

    async update(id, updateData, userId = null) {
        const event = await this.findById(id);
        if (!event) return null;

        const updatedAt = new Date();

        await db.query(QUERIES.UPDATE, [
            updateData.societyId !== undefined ? updateData.societyId : event.societyId,
            updateData.categoryId !== undefined ? updateData.categoryId : event.categoryId,
            updateData.title !== undefined ? updateData.title : event.title,
            updateData.description !== undefined ? updateData.description : event.description,
            updateData.eventType !== undefined ? updateData.eventType : event.eventType,
            updateData.startDatetime !== undefined ? updateData.startDatetime : event.startDatetime,
            updateData.endDatetime !== undefined ? updateData.endDatetime : event.endDatetime,
            updateData.location !== undefined ? updateData.location : event.location,
            updateData.maxParticipants !== undefined ? updateData.maxParticipants : event.maxParticipants,
            updateData.registrationRequired !== undefined ? (updateData.registrationRequired ? 1 : 0) : event.registrationRequired,
            updateData.ticketPrice !== undefined ? updateData.ticketPrice : event.ticketPrice,
            updateData.status !== undefined ? updateData.status : event.status,
            updateData.members !== undefined ? updateData.members : event.members,
            updatedAt,
            updateData.attachmentUrl !== undefined ? updateData.attachmentUrl : event.attachmentUrl,
            id
        ]);

        return await this.findById(id);
    }

    async delete(id) {
        await db.query(QUERIES.DELETE, [id]);
        return true;
    }
}

module.exports = new EventRepository();
