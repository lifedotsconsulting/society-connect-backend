const express = require('express');
const { complaintController } = require('../controllers');

const router = express.Router();

/**
 * @swagger
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
 *   get:
 *     summary: Get all complaints
 *     tags: [Complaints]
 */
router.post('/', complaintController.createComplaint);
router.get('/', complaintController.getAllComplaints);

/**
 * @swagger
 * /complaints/my:
 *   get:
 *     summary: Get my complaints
 *     tags: [Complaints]
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
 *   put:
 *     summary: Update a complaint by ID
 *     tags: [Complaints]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *   delete:
 *     summary: Delete a complaint by ID
 *     tags: [Complaints]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', complaintController.getComplaintById);
router.put('/:id', complaintController.updateComplaint);
router.delete('/:id', complaintController.deleteComplaint);

module.exports = router;
