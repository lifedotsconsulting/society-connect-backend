const express = require('express');
const importantContactController = require('../controllers/important-contact.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ImportantContact:
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
 *   name: Important Contacts
 *   description: Important Contacts Management API
 */

/**
 * @swagger
 * /important-contacts:
 *   post:
 *     summary: Create a new ImportantContact
 *     tags: [Important Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ImportantContact'
 *     responses:
 *       201:
 *         description: The ImportantContact was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImportantContact'
 *   get:
 *     summary: Get all Important Contacts
 *     tags: [Important Contacts]
 *     responses:
 *       200:
 *         description: List of all Important Contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ImportantContact'
 */

/**
 * @swagger
 * /important-contacts/{id}:
 *   get:
 *     summary: Get a ImportantContact by ID
 *     tags: [Important Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The ImportantContact description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImportantContact'
 *       404:
 *         description: The ImportantContact was not found
 *   put:
 *     summary: Update a ImportantContact by ID
 *     tags: [Important Contacts]
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
 *             $ref: '#/components/schemas/ImportantContact'
 *     responses:
 *       200:
 *         description: The ImportantContact was updated successfully
 *       404:
 *         description: The ImportantContact was not found
 *   delete:
 *     summary: Delete a ImportantContact by ID
 *     tags: [Important Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The ImportantContact was deleted
 *       404:
 *         description: The ImportantContact was not found
 */

router.use(authMiddleware);

router.post('/', importantContactController.createContact);
router.get('/', importantContactController.getAllContacts);
router.get('/:id', importantContactController.getContactById);
router.put('/:id', importantContactController.updateContact);
router.delete('/:id', importantContactController.deleteContact);

module.exports = router;
