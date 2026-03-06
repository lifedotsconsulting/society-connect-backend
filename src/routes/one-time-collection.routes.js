const express = require('express');
const oneTimeCollectionController = require('../controllers/one-time-collection.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     OneTimeCollection:
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
 *   name: One Time Collections
 *   description: One Time Collections Management API
 */

/**
 * @swagger
 * /one-time-collections:
 *   post:
 *     summary: Create a new OneTimeCollection
 *     tags: [One Time Collections]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OneTimeCollection'
 *     responses:
 *       201:
 *         description: The OneTimeCollection was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OneTimeCollection'
 *   get:
 *     summary: Get all One Time Collections
 *     tags: [One Time Collections]
 *     responses:
 *       200:
 *         description: List of all One Time Collections
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OneTimeCollection'
 */

/**
 * @swagger
 * /one-time-collections/{id}:
 *   get:
 *     summary: Get a OneTimeCollection by ID
 *     tags: [One Time Collections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The OneTimeCollection description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OneTimeCollection'
 *       404:
 *         description: The OneTimeCollection was not found
 *   put:
 *     summary: Update a OneTimeCollection by ID
 *     tags: [One Time Collections]
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
 *             $ref: '#/components/schemas/OneTimeCollection'
 *     responses:
 *       200:
 *         description: The OneTimeCollection was updated successfully
 *       404:
 *         description: The OneTimeCollection was not found
 *   delete:
 *     summary: Delete a OneTimeCollection by ID
 *     tags: [One Time Collections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The OneTimeCollection was deleted
 *       404:
 *         description: The OneTimeCollection was not found
 */

router.use(authMiddleware);

router.post('/', oneTimeCollectionController.createCollection);
router.get('/', oneTimeCollectionController.getAllCollections);
router.get('/:id', oneTimeCollectionController.getCollectionById);
router.put('/:id', oneTimeCollectionController.updateCollection);
router.delete('/:id', oneTimeCollectionController.deleteCollection);

module.exports = router;
