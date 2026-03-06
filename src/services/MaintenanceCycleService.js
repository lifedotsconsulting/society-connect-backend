const { MaintenanceCycleRepository } = require('../repositories');

class MaintenanceCycleService {
    async getAllCycles(filters = {}) {
        return await MaintenanceCycleRepository.findAll(filters);
    }

    async getCycleById(id) {
        return await MaintenanceCycleRepository.findById(id);
    }

    async createCycle(cycleData, userId) {
        cycleData.createdBy = userId;
        return await MaintenanceCycleRepository.create(cycleData);
    }

    async updateCycle(id, updateData) {
        return await MaintenanceCycleRepository.update(id, updateData);
    }

    async deleteCycle(id) {
        return await MaintenanceCycleRepository.delete(id);
    }
}

module.exports = new MaintenanceCycleService();
