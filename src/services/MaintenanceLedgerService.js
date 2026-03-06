const { MaintenanceLedgerRepository } = require('../repositories');

class MaintenanceLedgerService {
    async getLedgerEntries(filters = {}) {
        return await MaintenanceLedgerRepository.findAll(filters);
    }

    async getLedgerById(id) {
        return await MaintenanceLedgerRepository.findById(id);
    }

    async createLedgerEntry(ledgerData, userId) {
        ledgerData.createdBy = userId;
        return await MaintenanceLedgerRepository.create(ledgerData);
    }

    async updateLedgerEntry(id, updateData) {
        return await MaintenanceLedgerRepository.update(id, updateData);
    }

    async deleteLedgerEntry(id) {
        return await MaintenanceLedgerRepository.delete(id);
    }
}

module.exports = new MaintenanceLedgerService();
