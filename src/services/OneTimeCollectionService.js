const { OneTimeCollectionRepository } = require('../repositories');

class OneTimeCollectionService {
    async getAllCollections(filters = {}) {
        return await OneTimeCollectionRepository.findAll(filters);
    }

    async getCollectionById(id) {
        return await OneTimeCollectionRepository.findById(id);
    }

    async createCollection(otcData, userId) {
        otcData.createdBy = userId;
        return await OneTimeCollectionRepository.create(otcData);
    }

    async updateCollection(id, updateData) {
        return await OneTimeCollectionRepository.update(id, updateData);
    }

    async deleteCollection(id) {
        return await OneTimeCollectionRepository.delete(id);
    }
}

module.exports = new OneTimeCollectionService();
