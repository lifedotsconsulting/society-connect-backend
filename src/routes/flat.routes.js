const express = require('express');
const { flatController } = require('../controllers');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Flats
 *   description: Flat Management API
 */

/**
 * @swagger
 * /flats:
 *   post:
 *     summary: Create a new flat
 *     tags: [Flats]
 *   get:
 *     summary: Get all flats
 *     tags: [Flats]
 */
router.post('/', flatController.createFlat);
router.get('/', flatController.getAllFlats);

/**
 * @swagger
 * /flats/{id}:
 *   get:
 *     summary: Get a flat by ID
 *     tags: [Flats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *   put:
 *     summary: Update a flat by ID
 *     tags: [Flats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *   delete:
 *     summary: Delete a flat by ID
 *     tags: [Flats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', flatController.getFlatById);
router.put('/:id', flatController.updateFlat);
router.delete('/:id', flatController.deleteFlat);

module.exports = router;
