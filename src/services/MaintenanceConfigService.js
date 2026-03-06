const { MaintenanceConfigRepository } = require('../repositories');

class MaintenanceConfigService {
    async getAllConfigs(filters = {}) {
        return await MaintenanceConfigRepository.findAll(filters);
    }

    async getConfigById(id) {
        return await MaintenanceConfigRepository.findById(id);
    }

    async createConfig(configData, userId) {
        configData.createdBy = userId;
        return await MaintenanceConfigRepository.create(configData);
    }

    async updateConfig(id, updateData) {
        return await MaintenanceConfigRepository.update(id, updateData);
    }

    async deleteConfig(id) {
        return await MaintenanceConfigRepository.delete(id);
    }
}

module.exports = new MaintenanceConfigService();
