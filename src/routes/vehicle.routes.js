const express = require('express');
const { vehicleController } = require('../controllers');

const router = express.Router();

/**
 * @swagger
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
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicles]
 */
router.post('/', vehicleController.createVehicle);
router.get('/', vehicleController.getAllVehicles);

/**
 * @swagger
 * /vehicles/my:
 *   get:
 *     summary: Get my vehicles
 *     tags: [Vehicles]
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
 *   put:
 *     summary: Update a vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *   delete:
 *     summary: Delete a vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', vehicleController.getVehicleById);
router.put('/:id', vehicleController.updateVehicle);
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;
