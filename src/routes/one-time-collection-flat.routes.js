const express = require('express');
const oneTimeCollectionFlatController = require('../controllers/one-time-collection-flat.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     OneTimeCollectionFlat:
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
 *   name: One Time Collection Flats
 *   description: One Time Collection Flats Management API
 */

/**
 * @swagger
 * /one-time-collection-flats:
 *   post:
 *     summary: Create a new OneTimeCollectionFlat
 *     tags: [One Time Collection Flats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OneTimeCollectionFlat'
 *     responses:
 *       201:
 *         description: The OneTimeCollectionFlat was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OneTimeCollectionFlat'
 *   get:
 *     summary: Get all One Time Collection Flats
 *     tags: [One Time Collection Flats]
 *     responses:
 *       200:
 *         description: List of all One Time Collection Flats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OneTimeCollectionFlat'
 */

/**
 * @swagger
 * /one-time-collection-flats/{id}:
 *   get:
 *     summary: Get a OneTimeCollectionFlat by ID
 *     tags: [One Time Collection Flats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The OneTimeCollectionFlat description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OneTimeCollectionFlat'
 *       404:
 *         description: The OneTimeCollectionFlat was not found
 *   put:
 *     summary: Update a OneTimeCollectionFlat by ID
 *     tags: [One Time Collection Flats]
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
 *             $ref: '#/components/schemas/OneTimeCollectionFlat'
 *     responses:
 *       200:
 *         description: The OneTimeCollectionFlat was updated successfully
 *       404:
 *         description: The OneTimeCollectionFlat was not found
 *   delete:
 *     summary: Delete a OneTimeCollectionFlat by ID
 *     tags: [One Time Collection Flats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The OneTimeCollectionFlat was deleted
 *       404:
 *         description: The OneTimeCollectionFlat was not found
 */

router.use(authMiddleware);

router.post('/', oneTimeCollectionFlatController.createRecord);
router.get('/', oneTimeCollectionFlatController.getAllRecords);
router.get('/:id', oneTimeCollectionFlatController.getRecordById);
router.put('/:id', oneTimeCollectionFlatController.updateRecord);
router.delete('/:id', oneTimeCollectionFlatController.deleteRecord);

module.exports = router;
