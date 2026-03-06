const express = require('express');
const subscriptionController = require('../controllers/subscription.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Subscription:
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
 *   name: Subscriptions
 *   description: Subscriptions Management API
 */

/**
 * @swagger
 * /subscriptions:
 *   post:
 *     summary: Create a new Subscription
 *     tags: [Subscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       201:
 *         description: The Subscription was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *   get:
 *     summary: Get all Subscriptions
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: List of all Subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 */

/**
 * @swagger
 * /subscriptions/{id}:
 *   get:
 *     summary: Get a Subscription by ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The Subscription description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: The Subscription was not found
 *   put:
 *     summary: Update a Subscription by ID
 *     tags: [Subscriptions]
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
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       200:
 *         description: The Subscription was updated successfully
 *       404:
 *         description: The Subscription was not found
 *   delete:
 *     summary: Delete a Subscription by ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The Subscription was deleted
 *       404:
 *         description: The Subscription was not found
 */

// Subscriptions might need strong protection since they track SaaS details
router.use(authMiddleware);

router.post('/', subscriptionController.createSubscription);
router.get('/', subscriptionController.getAllSubscriptions);
router.get('/:id', subscriptionController.getSubscriptionById);
router.put('/:id', subscriptionController.updateSubscription);
router.delete('/:id', subscriptionController.deleteSubscription);

module.exports = router;
