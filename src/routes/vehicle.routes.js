const express = require('express');
const { vehicleController } = require('../controllers');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       required:
 *         - vehicleNumber
 *       properties:
 *         identity:
 *           type: string
 *         vehicleNumber:
 *           type: string
 *         type:
 *           type: string
 *           default: 4-wheeler
 *         make:
 *           type: string
 *         model:
 *           type: string
 *         color:
 *           type: string
 *         ownerUserId:
 *           type: string
 *         flatNumber:
 *           type: string
 *         parkingSlot:
 *           type: string
 *       example:
 *         vehicleNumber: MH12AB1234
 *         type: 4-wheeler
 *         make: Honda
 *         model: City
 *         color: White
 * tags:
 *   name: Vehicles
 *   description: Vehicle Management API
 */

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Create a new vehicle
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       201:
 *         description: The vehicle was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: List of all vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 */
router.post('/', vehicleController.createVehicle);
router.get('/', vehicleController.getAllVehicles);

/**
 * @swagger
 * /vehicles/my:
 *   get:
 *     summary: Get my vehicles
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: List of my vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 */
router.get('/my', vehicleController.getMyVehicles); // Will need auth middleware soon

/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     summary: Get a vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The vehicle description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: The vehicle was not found
 *   put:
 *     summary: Update a vehicle by ID
 *     tags: [Vehicles]
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
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: The vehicle was updated successfully
 *       404:
 *         description: The vehicle was not found
 *   delete:
 *     summary: Delete a vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The vehicle was deleted
 *       404:
 *         description: The vehicle was not found
 */
router.get('/:id', vehicleController.getVehicleById);
router.put('/:id', vehicleController.updateVehicle);
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;
