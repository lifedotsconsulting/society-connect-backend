const express = require('express');
const auditController = require('../controllers/audit.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Audit:
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
 *   name: Audits
 *   description: Audits Management API
 */

/**
 * @swagger
 * /audits:
 *   post:
 *     summary: Create a new Audit
 *     tags: [Audits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Audit'
 *     responses:
 *       201:
 *         description: The Audit was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Audit'
 *   get:
 *     summary: Get all Audits
 *     tags: [Audits]
 *     responses:
 *       200:
 *         description: List of all Audits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Audit'
 */

/**
 * @swagger
 * /audits/{id}:
 *   get:
 *     summary: Get a Audit by ID
 *     tags: [Audits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The Audit description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Audit'
 *       404:
 *         description: The Audit was not found
 *   put:
 *     summary: Update a Audit by ID
 *     tags: [Audits]
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
 *             $ref: '#/components/schemas/Audit'
 *     responses:
 *       200:
 *         description: The Audit was updated successfully
 *       404:
 *         description: The Audit was not found
 *   delete:
 *     summary: Delete a Audit by ID
 *     tags: [Audits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The Audit was deleted
 *       404:
 *         description: The Audit was not found
 */

router.use(authMiddleware);

router.post('/', auditController.createAudit);
router.get('/', auditController.getAllAudits);
router.get('/:id', auditController.getAuditById);
router.put('/:id', auditController.updateAudit);
router.delete('/:id', auditController.deleteAudit);

module.exports = router;
