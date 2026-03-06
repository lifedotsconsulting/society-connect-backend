const express = require('express');
const complaintCommentController = require('../controllers/complaint-comment.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ComplaintComment:
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
 *   name: Complaint Comments
 *   description: Complaint Comments Management API
 */

/**
 * @swagger
 * :
 *   post:
 *     summary: Create a new ComplaintComment
 *     tags: [Complaint Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComplaintComment'
 *     responses:
 *       201:
 *         description: The ComplaintComment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ComplaintComment'
 *   get:
 *     summary: Get all Complaint Comments
 *     tags: [Complaint Comments]
 *     responses:
 *       200:
 *         description: List of all Complaint Comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ComplaintComment'
 */

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a ComplaintComment by ID
 *     tags: [Complaint Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The ComplaintComment description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ComplaintComment'
 *       404:
 *         description: The ComplaintComment was not found
 *   put:
 *     summary: Update a ComplaintComment by ID
 *     tags: [Complaint Comments]
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
 *             $ref: '#/components/schemas/ComplaintComment'
 *     responses:
 *       200:
 *         description: The ComplaintComment was updated successfully
 *       404:
 *         description: The ComplaintComment was not found
 *   delete:
 *     summary: Delete a ComplaintComment by ID
 *     tags: [Complaint Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The ComplaintComment was deleted
 *       404:
 *         description: The ComplaintComment was not found
 */

router.use(authMiddleware);

// Notice nested path structure: /complaints/:complaintId/comments
router.post('/complaints/:complaintId/comments', complaintCommentController.addComment);
router.get('/complaints/:complaintId/comments', complaintCommentController.getCommentsByComplaintId);

// Direct comment access by its ID
router.get('/comments/:id', complaintCommentController.getCommentById);
router.put('/comments/:id', complaintCommentController.updateComment);
router.delete('/comments/:id', complaintCommentController.deleteComment);

module.exports = router;
