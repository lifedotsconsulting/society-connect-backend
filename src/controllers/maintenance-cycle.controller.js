const { MaintenanceCycleService } = require('../services');

class MaintenanceCycleController {
    async getAllCycles(req, res) {
        try {
            const cycles = await MaintenanceCycleService.getAllCycles(req.query);
            res.status(200).json(cycles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCycleById(req, res) {
        try {
            const cycle = await MaintenanceCycleService.getCycleById(req.params.id);
            if (!cycle) return res.status(404).json({ error: 'Maintenance Cycle not found' });
            res.status(200).json(cycle);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createCycle(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const cycle = await MaintenanceCycleService.createCycle(req.body, userId);
            res.status(201).json(cycle);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateCycle(req, res) {
        try {
            const cycle = await MaintenanceCycleService.updateCycle(req.params.id, req.body);
            if (!cycle) return res.status(404).json({ error: 'Maintenance Cycle not found' });
            res.status(200).json(cycle);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteCycle(req, res) {
        try {
            const success = await MaintenanceCycleService.deleteCycle(req.params.id);
            if (!success) return res.status(404).json({ error: 'Maintenance Cycle not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new MaintenanceCycleController();
