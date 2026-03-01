const BaseDao = require('./BaseDao');
const { Event } = require('../models');

class EventDao extends BaseDao {
    constructor() {
        super(Event);
    }

    // Event-specific DAO methods
    async findUpcomingEvents() {
        const allEvents = await this.findAll({ isPublished: true });
        const now = new Date();
        return allEvents.filter(e => new Date(e.eventDate) >= now);
    }
}

module.exports = new EventDao();
