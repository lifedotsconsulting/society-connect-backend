const express = require('express');
const { complaintController } = require('../controllers');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Complaint:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         identity:
 *           type: string
 *         title:
 *           type: string
 *         category:
 *           type: string
 *           default: General
 *         status:
 *           type: string
 *           default: Open
 *         priority:
 *           type: string
 *           default: Medium
 *         raisedByUserId:
 *           type: string
 *         raisedForFlat:
 *           type: string
 *         assignedTo:
 *           type: string
 *         resolutionNotes:
 *           type: string
 *       example:
 *         title: Water leakage in bathroom
 *         category: Plumbing
 *         status: Open
 *         priority: High
 * tags:
 *   name: Complaints
 *   description: Complaint Management API
 */

/**
 * @swagger
 * /complaints:
 *   post:
 *     summary: Create a new complaint
 *     tags: [Complaints]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Complaint'
 *     responses:
 *       201:
 *         description: The complaint was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Complaint'
 *   get:
 *     summary: Get all complaints
 *     tags: [Complaints]
 *     responses:
 *       200:
 *         description: List of all complaints
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Complaint'
 */
router.post('/', complaintController.createComplaint);
router.get('/', complaintController.getAllComplaints);

/**
 * @swagger
 * /complaints/my:
 *   get:
 *     summary: Get my complaints
 *     tags: [Complaints]
 *     responses:
 *       200:
 *         description: List of my complaints
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Complaint'
 */
router.get('/my', complaintController.getMyComplaints); // Will need auth middleware soon

/**
 * @swagger
 * /complaints/{id}:
 *   get:
 *     summary: Get a complaint by ID
 *     tags: [Complaints]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The complaint description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Complaint'
 *       404:
 *         description: The complaint was not found
 *   put:
 *     summary: Update a complaint by ID
 *     tags: [Complaints]
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
 *             $ref: '#/components/schemas/Complaint'
 *     responses:
 *       200:
 *         description: The complaint was updated successfully
 *       404:
 *         description: The complaint was not found
 *   delete:
 *     summary: Delete a complaint by ID
 *     tags: [Complaints]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The complaint was deleted
 *       404:
 *         description: The complaint was not found
 */
router.get('/:id', complaintController.getComplaintById);
router.put('/:id', complaintController.updateComplaint);
router.delete('/:id', complaintController.deleteComplaint);

module.exports = router;
