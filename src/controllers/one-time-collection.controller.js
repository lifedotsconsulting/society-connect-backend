const { OneTimeCollectionService } = require('../services');

class OneTimeCollectionController {
    async getAllCollections(req, res) {
        try {
            const collections = await OneTimeCollectionService.getAllCollections(req.query);
            res.status(200).json(collections);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCollectionById(req, res) {
        try {
            const collection = await OneTimeCollectionService.getCollectionById(req.params.id);
            if (!collection) return res.status(404).json({ error: 'One Time Collection not found' });
            res.status(200).json(collection);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createCollection(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const collection = await OneTimeCollectionService.createCollection(req.body, userId);
            res.status(201).json(collection);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateCollection(req, res) {
        try {
            const collection = await OneTimeCollectionService.updateCollection(req.params.id, req.body);
            if (!collection) return res.status(404).json({ error: 'One Time Collection not found' });
            res.status(200).json(collection);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteCollection(req, res) {
        try {
            const success = await OneTimeCollectionService.deleteCollection(req.params.id);
            if (!success) return res.status(404).json({ error: 'One Time Collection not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new OneTimeCollectionController();
