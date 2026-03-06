const express = require('express');
const complaintCategoryController = require('../controllers/complaint-category.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ComplaintCategory:
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
 *   name: Complaint Categories
 *   description: Complaint Categories Management API
 */

/**
 * @swagger
 * /complaint-categories:
 *   post:
 *     summary: Create a new ComplaintCategory
 *     tags: [Complaint Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComplaintCategory'
 *     responses:
 *       201:
 *         description: The ComplaintCategory was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ComplaintCategory'
 *   get:
 *     summary: Get all Complaint Categories
 *     tags: [Complaint Categories]
 *     responses:
 *       200:
 *         description: List of all Complaint Categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ComplaintCategory'
 */

/**
 * @swagger
 * /complaint-categories/{id}:
 *   get:
 *     summary: Get a ComplaintCategory by ID
 *     tags: [Complaint Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The ComplaintCategory description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ComplaintCategory'
 *       404:
 *         description: The ComplaintCategory was not found
 *   put:
 *     summary: Update a ComplaintCategory by ID
 *     tags: [Complaint Categories]
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
 *             $ref: '#/components/schemas/ComplaintCategory'
 *     responses:
 *       200:
 *         description: The ComplaintCategory was updated successfully
 *       404:
 *         description: The ComplaintCategory was not found
 *   delete:
 *     summary: Delete a ComplaintCategory by ID
 *     tags: [Complaint Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The ComplaintCategory was deleted
 *       404:
 *         description: The ComplaintCategory was not found
 */

router.use(authMiddleware);

router.post('/', complaintCategoryController.createCategory);
router.get('/', complaintCategoryController.getAllCategories);
router.get('/:id', complaintCategoryController.getCategoryById);
router.put('/:id', complaintCategoryController.updateCategory);
router.delete('/:id', complaintCategoryController.deleteCategory);

module.exports = router;
