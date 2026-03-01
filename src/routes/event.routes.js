const express = require('express');
const { eventController } = require('../controllers');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event Management API
 */

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 */
router.post('/', eventController.createEvent);
router.get('/', eventController.getAllEvents);

/**
 * @swagger
 * /events/upcoming:
 *   get:
 *     summary: Get upcoming events
 *     tags: [Events]
 */
router.get('/upcoming', eventController.getUpcomingEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *   put:
 *     summary: Update an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', eventController.getEventById);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
