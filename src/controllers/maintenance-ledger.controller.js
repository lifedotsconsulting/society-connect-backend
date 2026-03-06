const { MaintenanceLedgerService } = require('../services');

class MaintenanceLedgerController {
    async getAllLedgerEntries(req, res) {
        try {
            const entries = await MaintenanceLedgerService.getAllLedgerEntries(req.query);
            res.status(200).json(entries);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getLedgerEntryById(req, res) {
        try {
            const entry = await MaintenanceLedgerService.getLedgerEntryById(req.params.id);
            if (!entry) return res.status(404).json({ error: 'Maintenance Ledger entry not found' });
            res.status(200).json(entry);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createLedgerEntry(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const entry = await MaintenanceLedgerService.createLedgerEntry(req.body, userId);
            res.status(201).json(entry);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateLedgerEntry(req, res) {
        try {
            const entry = await MaintenanceLedgerService.updateLedgerEntry(req.params.id, req.body);
            if (!entry) return res.status(404).json({ error: 'Maintenance Ledger entry not found' });
            res.status(200).json(entry);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteLedgerEntry(req, res) {
        try {
            const success = await MaintenanceLedgerService.deleteLedgerEntry(req.params.id);
            if (!success) return res.status(404).json({ error: 'Maintenance Ledger entry not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new MaintenanceLedgerController();
