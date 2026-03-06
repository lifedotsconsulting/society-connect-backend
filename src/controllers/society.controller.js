const { SocietyService } = require('../services');

class SocietyController {
    async getAllSocieties(req, res) {
        try {
            const societies = await SocietyService.getAllSocieties(req.query);
            res.status(200).json(societies);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getSocietyById(req, res) {
        try {
            const society = await SocietyService.getSocietyById(req.params.id);
            if (!society) return res.status(404).json({ error: 'Society not found' });
            res.status(200).json(society);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createSociety(req, res) {
        try {
            const society = await SocietyService.createSociety(req.body);
            res.status(201).json(society);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateSociety(req, res) {
        try {
            const society = await SocietyService.updateSociety(req.params.id, req.body);
            if (!society) return res.status(404).json({ error: 'Society not found' });
            res.status(200).json(society);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteSociety(req, res) {
        try {
            const success = await SocietyService.deleteSociety(req.params.id);
            if (!success) return res.status(404).json({ error: 'Society not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new SocietyController();
