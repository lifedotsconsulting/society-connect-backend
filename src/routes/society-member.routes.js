const express = require('express');
const societyMemberController = require('../controllers/society-member.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     SocietyMember:
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
 *   name: Society Members
 *   description: Society Members Management API
 */

/**
 * @swagger
 * /society-members:
 *   post:
 *     summary: Create a new SocietyMember
 *     tags: [Society Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SocietyMember'
 *     responses:
 *       201:
 *         description: The SocietyMember was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SocietyMember'
 *   get:
 *     summary: Get all Society Members
 *     tags: [Society Members]
 *     responses:
 *       200:
 *         description: List of all Society Members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SocietyMember'
 */

/**
 * @swagger
 * /society-members/{id}:
 *   get:
 *     summary: Get a SocietyMember by ID
 *     tags: [Society Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The SocietyMember description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SocietyMember'
 *       404:
 *         description: The SocietyMember was not found
 *   put:
 *     summary: Update a SocietyMember by ID
 *     tags: [Society Members]
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
 *             $ref: '#/components/schemas/SocietyMember'
 *     responses:
 *       200:
 *         description: The SocietyMember was updated successfully
 *       404:
 *         description: The SocietyMember was not found
 *   delete:
 *     summary: Delete a SocietyMember by ID
 *     tags: [Society Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The SocietyMember was deleted
 *       404:
 *         description: The SocietyMember was not found
 */

router.use(authMiddleware);

router.post('/', societyMemberController.createSocietyMember);
router.get('/', societyMemberController.getAllSocietyMembers);
router.get('/:id', societyMemberController.getSocietyMemberById);
router.put('/:id', societyMemberController.updateSocietyMember);
router.delete('/:id', societyMemberController.deleteSocietyMember);

module.exports = router;
