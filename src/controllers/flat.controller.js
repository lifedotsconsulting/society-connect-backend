const { FlatService } = require('../services');

class FlatController {
    async getAllFlats(req, res) {
        try {
            const flats = await FlatService.getAllFlats(req.query);
            res.status(200).json(flats);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getFlatById(req, res) {
        try {
            const flat = await FlatService.getFlatById(req.params.id);
            if (!flat) return res.status(404).json({ error: 'Flat not found' });
            res.status(200).json(flat);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createFlat(req, res) {
        try {
            const flat = await FlatService.createFlat(req.body);
            res.status(201).json(flat);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateFlat(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const flat = await FlatService.updateFlat(req.params.id, req.body, userId);
            if (!flat) return res.status(404).json({ error: 'Flat not found' });
            res.status(200).json(flat);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteFlat(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const success = await FlatService.deleteFlat(req.params.id, userId);
            if (!success) return res.status(404).json({ error: 'Flat not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new FlatController();
