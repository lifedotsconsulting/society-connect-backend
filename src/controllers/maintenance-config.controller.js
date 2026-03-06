const { MaintenanceConfigService } = require('../services');

class MaintenanceConfigController {
    async getAllConfigs(req, res) {
        try {
            const configs = await MaintenanceConfigService.getAllConfigs(req.query);
            res.status(200).json(configs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getConfigById(req, res) {
        try {
            const config = await MaintenanceConfigService.getConfigById(req.params.id);
            if (!config) return res.status(404).json({ error: 'Maintenance Config not found' });
            res.status(200).json(config);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createConfig(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const config = await MaintenanceConfigService.createConfig(req.body, userId);
            res.status(201).json(config);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateConfig(req, res) {
        try {
            const config = await MaintenanceConfigService.updateConfig(req.params.id, req.body);
            if (!config) return res.status(404).json({ error: 'Maintenance Config not found' });
            res.status(200).json(config);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteConfig(req, res) {
        try {
            const success = await MaintenanceConfigService.deleteConfig(req.params.id);
            if (!success) return res.status(404).json({ error: 'Maintenance Config not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new MaintenanceConfigController();
