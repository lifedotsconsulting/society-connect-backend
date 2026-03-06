const express = require('express');
const maintenanceLedgerController = require('../controllers/maintenance-ledger.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     MaintenanceLedger:
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
 *   name: Maintenance Ledgers
 *   description: Maintenance Ledgers Management API
 */

/**
 * @swagger
 * /maintenance-ledgers:
 *   post:
 *     summary: Create a new MaintenanceLedger
 *     tags: [Maintenance Ledgers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MaintenanceLedger'
 *     responses:
 *       201:
 *         description: The MaintenanceLedger was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenanceLedger'
 *   get:
 *     summary: Get all Maintenance Ledgers
 *     tags: [Maintenance Ledgers]
 *     responses:
 *       200:
 *         description: List of all Maintenance Ledgers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MaintenanceLedger'
 */

/**
 * @swagger
 * /maintenance-ledgers/{id}:
 *   get:
 *     summary: Get a MaintenanceLedger by ID
 *     tags: [Maintenance Ledgers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The MaintenanceLedger description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenanceLedger'
 *       404:
 *         description: The MaintenanceLedger was not found
 *   put:
 *     summary: Update a MaintenanceLedger by ID
 *     tags: [Maintenance Ledgers]
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
 *             $ref: '#/components/schemas/MaintenanceLedger'
 *     responses:
 *       200:
 *         description: The MaintenanceLedger was updated successfully
 *       404:
 *         description: The MaintenanceLedger was not found
 *   delete:
 *     summary: Delete a MaintenanceLedger by ID
 *     tags: [Maintenance Ledgers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The MaintenanceLedger was deleted
 *       404:
 *         description: The MaintenanceLedger was not found
 */

router.use(authMiddleware);

router.post('/', maintenanceLedgerController.createLedgerEntry);
router.get('/', maintenanceLedgerController.getAllLedgerEntries);
router.get('/:id', maintenanceLedgerController.getLedgerEntryById);
router.put('/:id', maintenanceLedgerController.updateLedgerEntry);
router.delete('/:id', maintenanceLedgerController.deleteLedgerEntry);

module.exports = router;
