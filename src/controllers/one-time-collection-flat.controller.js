const { OneTimeCollectionFlatService } = require('../services');

class OneTimeCollectionFlatController {
    async getAllRecords(req, res) {
        try {
            // allows querying by collection mapping to flats: ?collectionId=123
            const records = await OneTimeCollectionFlatService.getAllRecords(req.query);
            res.status(200).json(records);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getRecordById(req, res) {
        try {
            const record = await OneTimeCollectionFlatService.getRecordById(req.params.id);
            if (!record) return res.status(404).json({ error: 'One Time Collection Flat record not found' });
            res.status(200).json(record);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createRecord(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const record = await OneTimeCollectionFlatService.createRecord(req.body, userId);
            res.status(201).json(record);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateRecord(req, res) {
        try {
            const record = await OneTimeCollectionFlatService.updateRecord(req.params.id, req.body);
            if (!record) return res.status(404).json({ error: 'One Time Collection Flat record not found' });
            res.status(200).json(record);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteRecord(req, res) {
        try {
            const success = await OneTimeCollectionFlatService.deleteRecord(req.params.id);
            if (!success) return res.status(404).json({ error: 'One Time Collection Flat record not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new OneTimeCollectionFlatController();
