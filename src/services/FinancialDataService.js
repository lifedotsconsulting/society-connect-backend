const { FinancialDataRepository } = require('../repositories');

class FinancialDataService {
    async getFinancialDataBySocietyId(societyId) {
        const results = await FinancialDataRepository.findAll({ societyId });
        return results.length > 0 ? results[0] : null;
    }

    async getFinancialDataById(id) {
        return await FinancialDataRepository.findById(id);
    }

    async createFinancialData(data, userId) {
        data.updatedBy = userId;
        return await FinancialDataRepository.create(data);
    }

    async updateFinancialData(id, updateData, userId = null) {
        return await FinancialDataRepository.update(id, updateData, userId);
    }

    async deleteFinancialData(id) {
        return await FinancialDataRepository.delete(id);
    }
}

module.exports = new FinancialDataService();
