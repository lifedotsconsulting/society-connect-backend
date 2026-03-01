const { VehicleService } = require('../services');

class VehicleController {
    async getAllVehicles(req, res) {
        try {
            const vehicles = await VehicleService.getAllVehicles(req.query);
            res.status(200).json(vehicles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getMyVehicles(req, res) {
        try {
            if (!req.user || !req.user.identity) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const vehicles = await VehicleService.getMyVehicles(req.user.identity);
            res.status(200).json(vehicles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getVehicleById(req, res) {
        try {
            const vehicle = await VehicleService.getVehicleById(req.params.id);
            if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
            res.status(200).json(vehicle);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createVehicle(req, res) {
        try {
            const userId = req.user ? req.user.identity : 'system_or_anon_for_now';
            const vehicle = await VehicleService.createVehicle(req.body, userId);
            res.status(201).json(vehicle);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateVehicle(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const vehicle = await VehicleService.updateVehicle(req.params.id, req.body, userId);
            if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
            res.status(200).json(vehicle);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteVehicle(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const success = await VehicleService.deleteVehicle(req.params.id, userId);
            if (!success) return res.status(404).json({ error: 'Vehicle not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new VehicleController();
