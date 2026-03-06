const express = require('express');
const maintenanceConfigController = require('../controllers/maintenance-config.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     MaintenanceConfig:
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
 *   name: Maintenance Configs
 *   description: Maintenance Configs Management API
 */

/**
 * @swagger
 * /maintenance-configs:
 *   post:
 *     summary: Create a new MaintenanceConfig
 *     tags: [Maintenance Configs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MaintenanceConfig'
 *     responses:
 *       201:
 *         description: The MaintenanceConfig was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenanceConfig'
 *   get:
 *     summary: Get all Maintenance Configs
 *     tags: [Maintenance Configs]
 *     responses:
 *       200:
 *         description: List of all Maintenance Configs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MaintenanceConfig'
 */

/**
 * @swagger
 * /maintenance-configs/{id}:
 *   get:
 *     summary: Get a MaintenanceConfig by ID
 *     tags: [Maintenance Configs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The MaintenanceConfig description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MaintenanceConfig'
 *       404:
 *         description: The MaintenanceConfig was not found
 *   put:
 *     summary: Update a MaintenanceConfig by ID
 *     tags: [Maintenance Configs]
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
 *             $ref: '#/components/schemas/MaintenanceConfig'
 *     responses:
 *       200:
 *         description: The MaintenanceConfig was updated successfully
 *       404:
 *         description: The MaintenanceConfig was not found
 *   delete:
 *     summary: Delete a MaintenanceConfig by ID
 *     tags: [Maintenance Configs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The MaintenanceConfig was deleted
 *       404:
 *         description: The MaintenanceConfig was not found
 */

router.use(authMiddleware);

router.post('/', maintenanceConfigController.createConfig);
router.get('/', maintenanceConfigController.getAllConfigs);
router.get('/:id', maintenanceConfigController.getConfigById);
router.put('/:id', maintenanceConfigController.updateConfig);
router.delete('/:id', maintenanceConfigController.deleteConfig);

module.exports = router;
