const express = require('express');
const financialDataController = require('../controllers/financial-data.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     FinancialData:
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
 *   name: Financial Data
 *   description: Financial Data Management API
 */

/**
 * @swagger
 * /financial-data:
 *   post:
 *     summary: Create a new FinancialData
 *     tags: [Financial Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FinancialData'
 *     responses:
 *       201:
 *         description: The FinancialData was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FinancialData'
 *   get:
 *     summary: Get all Financial Data
 *     tags: [Financial Data]
 *     responses:
 *       200:
 *         description: List of all Financial Data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FinancialData'
 */

/**
 * @swagger
 * /financial-data/{id}:
 *   get:
 *     summary: Get a FinancialData by ID
 *     tags: [Financial Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The FinancialData description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FinancialData'
 *       404:
 *         description: The FinancialData was not found
 *   put:
 *     summary: Update a FinancialData by ID
 *     tags: [Financial Data]
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
 *             $ref: '#/components/schemas/FinancialData'
 *     responses:
 *       200:
 *         description: The FinancialData was updated successfully
 *       404:
 *         description: The FinancialData was not found
 *   delete:
 *     summary: Delete a FinancialData by ID
 *     tags: [Financial Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The FinancialData was deleted
 *       404:
 *         description: The FinancialData was not found
 */

router.use(authMiddleware);

router.post('/', financialDataController.createFinancialData);
router.get('/', financialDataController.getFinancialDataBySocietyId);
router.get('/:id', financialDataController.getFinancialDataById);
router.put('/:id', financialDataController.updateFinancialData);
router.delete('/:id', financialDataController.deleteFinancialData);

module.exports = router;
