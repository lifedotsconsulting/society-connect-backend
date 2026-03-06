const express = require('express');
const maintenanceBillController = require('../controllers/maintenance-bill.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     MaintenanceBill:
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
 *   name: Maintenance Bills
 *   description: Maintenance Bills Management API
 */

/**
 * @swagger
 * /maintenance-bills:
 *   post:
 *     summary: Create a new MaintenanceBill
 *     tags: [Maintenance Bills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MaintenanceBill'
 *     responses:
 *       201:
 *         description: The MaintenanceBill was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenanceBill'
 *   get:
 *     summary: Get all Maintenance Bills
 *     tags: [Maintenance Bills]
 *     responses:
 *       200:
 *         description: List of all Maintenance Bills
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MaintenanceBill'
 */

/**
 * @swagger
 * /maintenance-bills/{id}:
 *   get:
 *     summary: Get a MaintenanceBill by ID
 *     tags: [Maintenance Bills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The MaintenanceBill description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenanceBill'
 *       404:
 *         description: The MaintenanceBill was not found
 *   put:
 *     summary: Update a MaintenanceBill by ID
 *     tags: [Maintenance Bills]
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
 *             $ref: '#/components/schemas/MaintenanceBill'
 *     responses:
 *       200:
 *         description: The MaintenanceBill was updated successfully
 *       404:
 *         description: The MaintenanceBill was not found
 *   delete:
 *     summary: Delete a MaintenanceBill by ID
 *     tags: [Maintenance Bills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The MaintenanceBill was deleted
 *       404:
 *         description: The MaintenanceBill was not found
 */

router.use(authMiddleware);

router.post('/', maintenanceBillController.createBill);
router.get('/', maintenanceBillController.getAllBills);
router.get('/:id', maintenanceBillController.getBillById);
router.put('/:id', maintenanceBillController.updateBill);
router.delete('/:id', maintenanceBillController.deleteBill);

module.exports = router;
