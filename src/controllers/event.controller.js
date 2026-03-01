const { EventService } = require('../services');

class EventController {
    async getAllEvents(req, res) {
        try {
            const events = await EventService.getAllEvents(req.query);
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUpcomingEvents(req, res) {
        try {
            const events = await EventService.getUpcomingEvents();
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getEventById(req, res) {
        try {
            const event = await EventService.getEventById(req.params.id);
            if (!event) return res.status(404).json({ error: 'Event not found' });
            res.status(200).json(event);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createEvent(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const event = await EventService.createEvent(req.body, userId);
            res.status(201).json(event);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateEvent(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const event = await EventService.updateEvent(req.params.id, req.body, userId);
            if (!event) return res.status(404).json({ error: 'Event not found' });
            res.status(200).json(event);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteEvent(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const success = await EventService.deleteEvent(req.params.id, userId);
            if (!success) return res.status(404).json({ error: 'Event not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new EventController();
