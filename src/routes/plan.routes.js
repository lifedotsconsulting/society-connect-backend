const express = require('express');
const planController = require('../controllers/plan.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Plan:
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
 *   name: Plans
 *   description: Plans Management API
 */

/**
 * @swagger
 * /plans:
 *   post:
 *     summary: Create a new Plan
 *     tags: [Plans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plan'
 *     responses:
 *       201:
 *         description: The Plan was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plan'
 *   get:
 *     summary: Get all Plans
 *     tags: [Plans]
 *     responses:
 *       200:
 *         description: List of all Plans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plan'
 */

/**
 * @swagger
 * /plans/{id}:
 *   get:
 *     summary: Get a Plan by ID
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The Plan description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plan'
 *       404:
 *         description: The Plan was not found
 *   put:
 *     summary: Update a Plan by ID
 *     tags: [Plans]
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
 *             $ref: '#/components/schemas/Plan'
 *     responses:
 *       200:
 *         description: The Plan was updated successfully
 *       404:
 *         description: The Plan was not found
 *   delete:
 *     summary: Delete a Plan by ID
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The Plan was deleted
 *       404:
 *         description: The Plan was not found
 */

router.use(authMiddleware);

router.post('/', planController.createPlan);
router.get('/', planController.getAllPlans);
router.get('/:id', planController.getPlanById);
router.put('/:id', planController.updatePlan);
router.delete('/:id', planController.deletePlan);

module.exports = router;
