const { RoleService } = require('../services');

class RoleController {
    async getAllRoles(req, res) {
        try {
            const roles = await RoleService.getAllRoles(req.query);
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getRoleById(req, res) {
        try {
            const role = await RoleService.getRoleById(req.params.id);
            if (!role) return res.status(404).json({ error: 'Role not found' });
            res.status(200).json(role);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createRole(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const role = await RoleService.createRole(req.body, userId);
            res.status(201).json(role);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateRole(req, res) {
        try {
            const role = await RoleService.updateRole(req.params.id, req.body);
            if (!role) return res.status(404).json({ error: 'Role not found' });
            res.status(200).json(role);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteRole(req, res) {
        try {
            const success = await RoleService.deleteRole(req.params.id);
            if (!success) return res.status(404).json({ error: 'Role not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new RoleController();
