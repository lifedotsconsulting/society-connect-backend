const express = require('express');
const maintenanceCycleController = require('../controllers/maintenance-cycle.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     MaintenanceCycle:
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
 *   name: Maintenance Cycles
 *   description: Maintenance Cycles Management API
 */

/**
 * @swagger
 * /maintenance-cycles:
 *   post:
 *     summary: Create a new MaintenanceCycle
 *     tags: [Maintenance Cycles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MaintenanceCycle'
 *     responses:
 *       201:
 *         description: The MaintenanceCycle was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenanceCycle'
 *   get:
 *     summary: Get all Maintenance Cycles
 *     tags: [Maintenance Cycles]
 *     responses:
 *       200:
 *         description: List of all Maintenance Cycles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MaintenanceCycle'
 */

/**
 * @swagger
 * /maintenance-cycles/{id}:
 *   get:
 *     summary: Get a MaintenanceCycle by ID
 *     tags: [Maintenance Cycles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The MaintenanceCycle description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenanceCycle'
 *       404:
 *         description: The MaintenanceCycle was not found
 *   put:
 *     summary: Update a MaintenanceCycle by ID
 *     tags: [Maintenance Cycles]
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
 *             $ref: '#/components/schemas/MaintenanceCycle'
 *     responses:
 *       200:
 *         description: The MaintenanceCycle was updated successfully
 *       404:
 *         description: The MaintenanceCycle was not found
 *   delete:
 *     summary: Delete a MaintenanceCycle by ID
 *     tags: [Maintenance Cycles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The MaintenanceCycle was deleted
 *       404:
 *         description: The MaintenanceCycle was not found
 */

router.use(authMiddleware);

router.post('/', maintenanceCycleController.createCycle);
router.get('/', maintenanceCycleController.getAllCycles);
router.get('/:id', maintenanceCycleController.getCycleById);
router.put('/:id', maintenanceCycleController.updateCycle);
router.delete('/:id', maintenanceCycleController.deleteCycle);

module.exports = router;
