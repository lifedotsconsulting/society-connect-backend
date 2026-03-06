const express = require('express');
const documentController = require('../controllers/document.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Document:
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
 *   name: Documents
 *   description: Documents Management API
 */

/**
 * @swagger
 * /documents:
 *   post:
 *     summary: Create a new Document
 *     tags: [Documents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Document'
 *     responses:
 *       201:
 *         description: The Document was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *   get:
 *     summary: Get all Documents
 *     tags: [Documents]
 *     responses:
 *       200:
 *         description: List of all Documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 */

/**
 * @swagger
 * /documents/{id}:
 *   get:
 *     summary: Get a Document by ID
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The Document description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       404:
 *         description: The Document was not found
 *   put:
 *     summary: Update a Document by ID
 *     tags: [Documents]
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
 *             $ref: '#/components/schemas/Document'
 *     responses:
 *       200:
 *         description: The Document was updated successfully
 *       404:
 *         description: The Document was not found
 *   delete:
 *     summary: Delete a Document by ID
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The Document was deleted
 *       404:
 *         description: The Document was not found
 */

router.use(authMiddleware);

router.post('/', documentController.createDocument);
router.get('/', documentController.getAllDocuments);
router.get('/:id', documentController.getDocumentById);
router.put('/:id', documentController.updateDocument);
router.delete('/:id', documentController.deleteDocument);

module.exports = router;
