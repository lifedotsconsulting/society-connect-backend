const express = require('express');
const societyController = require('../controllers/society.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Society:
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
 *   name: Societies
 *   description: Societies Management API
 */

/**
 * @swagger
 * /societies:
 *   post:
 *     summary: Create a new Society
 *     tags: [Societies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Society'
 *     responses:
 *       201:
 *         description: The Society was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Society'
 *   get:
 *     summary: Get all Societies
 *     tags: [Societies]
 *     responses:
 *       200:
 *         description: List of all Societies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Society'
 */

/**
 * @swagger
 * /societies/{id}:
 *   get:
 *     summary: Get a Society by ID
 *     tags: [Societies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The Society description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Society'
 *       404:
 *         description: The Society was not found
 *   put:
 *     summary: Update a Society by ID
 *     tags: [Societies]
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
 *             $ref: '#/components/schemas/Society'
 *     responses:
 *       200:
 *         description: The Society was updated successfully
 *       404:
 *         description: The Society was not found
 *   delete:
 *     summary: Delete a Society by ID
 *     tags: [Societies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The Society was deleted
 *       404:
 *         description: The Society was not found
 */

// Optionally protect routes
// router.use(authMiddleware);

router.post('/', societyController.createSociety);
router.get('/', societyController.getAllSocieties);
router.get('/:id', societyController.getSocietyById);
router.put('/:id', societyController.updateSociety);
router.delete('/:id', societyController.deleteSociety);

module.exports = router;
