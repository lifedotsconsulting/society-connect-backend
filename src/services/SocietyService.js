const { SocietyRepository } = require('../repositories');

class SocietyService {
    async getAllSocieties(filters = {}) {
        return await SocietyRepository.findAll(filters);
    }

    async getSocietyById(id) {
        return await SocietyRepository.findById(id);
    }

    async createSociety(societyData, userId) {
        societyData.createdBy = userId;
        return await SocietyRepository.create(societyData);
    }

    async updateSociety(id, updateData, userId = null) {
        return await SocietyRepository.update(id, updateData, userId);
    }

    async deleteSociety(id, userId = null) {
        return await SocietyRepository.delete(id, userId);
    }
}

module.exports = new SocietyService();
