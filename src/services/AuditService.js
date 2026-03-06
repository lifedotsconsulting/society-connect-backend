const { AuditRepository } = require('../repositories');

class AuditService {
    async getAudits(filters = {}) {
        return await AuditRepository.findAll(filters);
    }

    async getAuditById(id) {
        return await AuditRepository.findById(id);
    }

    async logAction(auditData, userId) {
        auditData.createdBy = userId;
        auditData.userId = userId;
        return await AuditRepository.create(auditData);
    }
}

module.exports = new AuditService();
