const express = require('express');
const rolePermissionController = require('../controllers/role-permission.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RolePermission:
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
 *   name: Role Permissions
 *   description: Role Permissions Management API
 */

/**
 * @swagger
 * /role-permissions:
 *   post:
 *     summary: Create a new RolePermission
 *     tags: [Role Permissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RolePermission'
 *     responses:
 *       201:
 *         description: The RolePermission was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RolePermission'
 *   get:
 *     summary: Get all Role Permissions
 *     tags: [Role Permissions]
 *     responses:
 *       200:
 *         description: List of all Role Permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RolePermission'
 */

/**
 * @swagger
 * /role-permissions/{id}:
 *   get:
 *     summary: Get a RolePermission by ID
 *     tags: [Role Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The RolePermission description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RolePermission'
 *       404:
 *         description: The RolePermission was not found
 *   put:
 *     summary: Update a RolePermission by ID
 *     tags: [Role Permissions]
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
 *             $ref: '#/components/schemas/RolePermission'
 *     responses:
 *       200:
 *         description: The RolePermission was updated successfully
 *       404:
 *         description: The RolePermission was not found
 *   delete:
 *     summary: Delete a RolePermission by ID
 *     tags: [Role Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The RolePermission was deleted
 *       404:
 *         description: The RolePermission was not found
 */

router.use(authMiddleware);

router.post('/', rolePermissionController.createRolePermission);
router.get('/', rolePermissionController.getAllRolePermissions);
router.get('/:id', rolePermissionController.getRolePermissionById);
router.put('/:id', rolePermissionController.updateRolePermission);
router.delete('/:id', rolePermissionController.deleteRolePermission);

module.exports = router;
