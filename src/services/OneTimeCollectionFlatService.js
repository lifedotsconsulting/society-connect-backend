const { OneTimeCollectionFlatRepository } = require('../repositories');

class OneTimeCollectionFlatService {
    async getAllCollectionFlats(filters = {}) {
        return await OneTimeCollectionFlatRepository.findAll(filters);
    }

    async getCollectionFlatById(id) {
        return await OneTimeCollectionFlatRepository.findById(id);
    }

    async createCollectionFlat(otcfData, userId) {
        otcfData.createdBy = userId;
        return await OneTimeCollectionFlatRepository.create(otcfData);
    }

    async updateCollectionFlat(id, updateData) {
        return await OneTimeCollectionFlatRepository.update(id, updateData);
    }

    async deleteCollectionFlat(id) {
        return await OneTimeCollectionFlatRepository.delete(id);
    }
}

module.exports = new OneTimeCollectionFlatService();
