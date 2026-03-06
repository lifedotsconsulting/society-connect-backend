const express = require('express');
const noticeController = require('../controllers/notice.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Notice:
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
 *   name: Notices
 *   description: Notices Management API
 */

/**
 * @swagger
 * /notices:
 *   post:
 *     summary: Create a new Notice
 *     tags: [Notices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notice'
 *     responses:
 *       201:
 *         description: The Notice was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notice'
 *   get:
 *     summary: Get all Notices
 *     tags: [Notices]
 *     responses:
 *       200:
 *         description: List of all Notices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notice'
 */

/**
 * @swagger
 * /notices/{id}:
 *   get:
 *     summary: Get a Notice by ID
 *     tags: [Notices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The Notice description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notice'
 *       404:
 *         description: The Notice was not found
 *   put:
 *     summary: Update a Notice by ID
 *     tags: [Notices]
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
 *             $ref: '#/components/schemas/Notice'
 *     responses:
 *       200:
 *         description: The Notice was updated successfully
 *       404:
 *         description: The Notice was not found
 *   delete:
 *     summary: Delete a Notice by ID
 *     tags: [Notices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The Notice was deleted
 *       404:
 *         description: The Notice was not found
 */

router.use(authMiddleware);

router.post('/', noticeController.createNotice);
router.get('/', noticeController.getAllNotices);
router.get('/:id', noticeController.getNoticeById);
router.put('/:id', noticeController.updateNotice);
router.delete('/:id', noticeController.deleteNotice);

module.exports = router;
