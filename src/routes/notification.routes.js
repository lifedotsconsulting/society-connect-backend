const express = require('express');
const notificationController = require('../controllers/notification.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         identity:
 *           type: string
 *         isActive:
 *           type: boolean
 *           default: true
 *       example:
 *         identity: "a1b2c3d4"
 *         isActive: true
 * tags:
 *   name: Notifications
 *   description: Notifications Management API
 */

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create a new Notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       201:
 *         description: The Notification was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *   get:
 *     summary: Get all Notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: List of all Notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 */

/**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     summary: Get a Notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The Notification description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: The Notification was not found
 *   put:
 *     summary: Update a Notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       200:
 *         description: The Notification was updated successfully
 *       404:
 *         description: The Notification was not found
 *   delete:
 *     summary: Delete a Notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The Notification was deleted
 *       404:
 *         description: The Notification was not found
 */

router.use(authMiddleware);

router.post('/', notificationController.createNotification);
router.get('/', notificationController.getUserNotifications);
router.put('/:id/read', notificationController.markAsRead);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
