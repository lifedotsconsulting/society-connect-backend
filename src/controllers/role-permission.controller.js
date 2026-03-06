const { RolePermissionService } = require('../services');

class RolePermissionController {
    async getAllRolePermissions(req, res) {
        try {
            const permissions = await RolePermissionService.getAllRolePermissions(req.query);
            res.status(200).json(permissions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getRolePermissionById(req, res) {
        try {
            const rp = await RolePermissionService.getRolePermissionById(req.params.id);
            if (!rp) return res.status(404).json({ error: 'Role Permission not found' });
            res.status(200).json(rp);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createRolePermission(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const rp = await RolePermissionService.createRolePermission(req.body, userId);
            res.status(201).json(rp);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateRolePermission(req, res) {
        try {
            const rp = await RolePermissionService.updateRolePermission(req.params.id, req.body);
            if (!rp) return res.status(404).json({ error: 'Role Permission not found' });
            res.status(200).json(rp);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteRolePermission(req, res) {
        try {
            const success = await RolePermissionService.deleteRolePermission(req.params.id);
            if (!success) return res.status(404).json({ error: 'Role Permission not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new RolePermissionController();
