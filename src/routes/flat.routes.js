const express = require('express');
const { flatController } = require('../controllers');
const upload = require('../middlewares/upload');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Flat:
 *       type: object
 *       required:
 *         - flatNumber
 *       properties:
 *         identity:
 *           type: string
 *         flatNumber:
 *           type: string
 *           description: Unique flat identifier (e.g. A101)
 *         block:
 *           type: string
 *         floor:
 *           type: integer
 *         bhk:
 *           type: string
 *           default: 2BHK
 *         occupancyStatus:
 *           type: string
 *           enum: [Vacant, Owner, Tenant]
 *           default: Vacant
 *         currentResidentId:
 *           type: string
 *         ownerId:
 *           type: string
 *       example:
 *         flatNumber: A101
 *         block: A
 *         floor: 1
 *         bhk: 2BHK
 *         occupancyStatus: Owner
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flat'
 *     responses:
 *       201:
 *         description: The flat was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flat'
 *       500:
 *         description: Some server error
 *   get:
 *     summary: Get all flats
 *     tags: [Flats]
 *     responses:
 *       200:
 *         description: List of all flats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flat'
 */
router.post('/', flatController.createFlat);
router.get('/', flatController.getAllFlats);

/**
 * @swagger
 * /flats/upload:
 *   post:
 *     summary: Bulk upload flats via CSV template
 *     tags: [Flats]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: CSV File following the template format
 *     responses:
 *       200:
 *         description: Upload processing results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 stats:
 *                   type: object
 *                   properties:
 *                     created:
 *                       type: integer
 *                     skipped:
 *                       type: integer
 *                     errors:
 *                       type: integer
 *                     totalRows:
 *                       type: integer
 *       400:
 *         description: No file uploaded or invalid file format
 *       500:
 *         description: Server error processing file
 */
router.post('/upload', upload.single('file'), flatController.uploadFlats);

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
 *         description: The flat identity
 *     responses:
 *       200:
 *         description: The flat description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flat'
 *       404:
 *         description: The flat was not found
 *   put:
 *     summary: Update a flat by ID
 *     tags: [Flats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The flat identity
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flat'
 *     responses:
 *       200:
 *         description: The flat was updated successfully
 *       404:
 *         description: The flat was not found
 *   delete:
 *     summary: Delete a flat by ID
 *     tags: [Flats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The flat identity
 *     responses:
 *       200:
 *         description: The flat was deleted
 *       404:
 *         description: The flat was not found
 */
router.get('/:id', flatController.getFlatById);
router.put('/:id', flatController.updateFlat);
router.delete('/:id', flatController.deleteFlat);

module.exports = router;
