const { EventRepository } = require('../repositories');

class EventService {
    async getAllEvents(filters = {}) {
        return await EventRepository.findAll(filters);
    }

    async getUpcomingEvents() {
        // Depending on DB structure for eventDate. Using findAll for now.
        return await EventRepository.findAll();
    }

    async getEventById(id) {
        return await EventRepository.findById(id);
    }

    async createEvent(eventData, userId) {
        // Business logic
        return await EventRepository.create(eventData);
    }

    async updateEvent(id, updateData, userId = null) {
        return await EventRepository.update(id, updateData, userId);
    }

    async deleteEvent(id, userId = null) {
        return await EventRepository.delete(id, userId);
    }
}

module.exports = new EventService();
