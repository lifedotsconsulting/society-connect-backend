const { AuditService } = require('../services');

class AuditController {
    async getAllAudits(req, res) {
        try {
            // Allows ?entityType=User&entityId=123 queries natively
            const audits = await AuditService.getAllAudits(req.query);
            res.status(200).json(audits);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAuditById(req, res) {
        try {
            const audit = await AuditService.getAuditById(req.params.id);
            if (!audit) return res.status(404).json({ error: 'Audit record not found' });
            res.status(200).json(audit);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createAudit(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const audit = await AuditService.createAudit(req.body, userId);
            res.status(201).json(audit);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Audits typically aren't updated or deleted, 
    // but basic scaffolding follows standard CRUD for now.

    async updateAudit(req, res) {
        try {
            const audit = await AuditService.updateAudit(req.params.id, req.body);
            if (!audit) return res.status(404).json({ error: 'Audit not found' });
            res.status(200).json(audit);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteAudit(req, res) {
        try {
            const success = await AuditService.deleteAudit(req.params.id);
            if (!success) return res.status(404).json({ error: 'Audit not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AuditController();
