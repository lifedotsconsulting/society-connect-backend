const { FinancialDataService } = require('../services');

class FinancialDataController {
    async getFinancialDataBySocietyId(req, res) {
        try {
            // Usually requested by society admins, assumes societyId is in query or route
            const societyId = req.query.societyId;
            if (!societyId) return res.status(400).json({ error: 'societyId query parameter is required' });

            const data = await FinancialDataService.getFinancialDataBySocietyId(societyId);
            if (!data) return res.status(404).json({ error: 'Financial data not found for this society' });

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getFinancialDataById(req, res) {
        try {
            const data = await FinancialDataService.getFinancialDataById(req.params.id);
            if (!data) return res.status(404).json({ error: 'Financial data not found' });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createFinancialData(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const data = await FinancialDataService.createFinancialData(req.body, userId);
            res.status(201).json(data);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateFinancialData(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const data = await FinancialDataService.updateFinancialData(req.params.id, req.body, userId);
            if (!data) return res.status(404).json({ error: 'Financial data not found' });
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteFinancialData(req, res) {
        try {
            const success = await FinancialDataService.deleteFinancialData(req.params.id);
            if (!success) return res.status(404).json({ error: 'Financial data not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new FinancialDataController();
