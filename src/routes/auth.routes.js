const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to the application
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - flatNumber
 *               - password
 *             properties:
 *               flatNumber:
 *                 type: string
 *                 example: A101
 *               password:
 *                 type: string
 *                 example: password123
 *               deviceId:
 *                 type: string
 *                 example: dev_abc123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                 tokens:
 *                   type: object
 *       400:
 *         description: Bad request (Missing username or password)
 *       401:
 *         description: Invalid User Credentials
 *       403:
 *         description: Device locked for this user
 *       404:
 *         description: User not found
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout from the application
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful logout
 */
router.post('/logout', authController.logout);

module.exports = router;
