const express = require('express');
const maintenancePaymentController = require('../controllers/maintenance-payment.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     MaintenancePayment:
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
 *   name: Maintenance Payments
 *   description: Maintenance Payments Management API
 */

/**
 * @swagger
 * /maintenance-payments:
 *   post:
 *     summary: Create a new MaintenancePayment
 *     tags: [Maintenance Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MaintenancePayment'
 *     responses:
 *       201:
 *         description: The MaintenancePayment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenancePayment'
 *   get:
 *     summary: Get all Maintenance Payments
 *     tags: [Maintenance Payments]
 *     responses:
 *       200:
 *         description: List of all Maintenance Payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MaintenancePayment'
 */

/**
 * @swagger
 * /maintenance-payments/{id}:
 *   get:
 *     summary: Get a MaintenancePayment by ID
 *     tags: [Maintenance Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The MaintenancePayment description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenancePayment'
 *       404:
 *         description: The MaintenancePayment was not found
 *   put:
 *     summary: Update a MaintenancePayment by ID
 *     tags: [Maintenance Payments]
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
 *             $ref: '#/components/schemas/MaintenancePayment'
 *     responses:
 *       200:
 *         description: The MaintenancePayment was updated successfully
 *       404:
 *         description: The MaintenancePayment was not found
 *   delete:
 *     summary: Delete a MaintenancePayment by ID
 *     tags: [Maintenance Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The MaintenancePayment was deleted
 *       404:
 *         description: The MaintenancePayment was not found
 */

router.use(authMiddleware);

router.post('/', maintenancePaymentController.createPayment);
router.get('/', maintenancePaymentController.getAllPayments);
router.get('/:id', maintenancePaymentController.getPaymentById);
router.put('/:id', maintenancePaymentController.updatePayment);
router.delete('/:id', maintenancePaymentController.deletePayment);

module.exports = router;
