const { EventDao } = require('../dao');

class EventService {
    async getAllEvents(filters = {}) {
        return await EventDao.findAll(filters);
    }

    async getUpcomingEvents() {
        return await EventDao.findUpcomingEvents();
    }

    async getEventById(id) {
        return await EventDao.findById(id);
    }

    async createEvent(eventData, userId) {
        // Business logic
        return await EventDao.create(eventData);
    }

    async updateEvent(id, updateData, userId = null) {
        return await EventDao.update(id, updateData, userId);
    }

    async deleteEvent(id, userId = null) {
        return await EventDao.delete(id, userId);
    }
}

module.exports = new EventService();
