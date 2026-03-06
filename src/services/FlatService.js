const { FlatRepository } = require('../repositories');

class FlatService {
    async getAllFlats(filters = {}) {
        return await FlatRepository.findAll(filters);
    }

    async getFlatById(id) {
        return await FlatRepository.findById(id);
    }

    async createFlat(flatData) {
        // Business logic: ensure unique flat number
        if (flatData.flatNumber) {
            const results = await FlatRepository.findAll({ flatNumber: flatData.flatNumber });
            const existing = results.length > 0 ? results[0] : null;
            if (existing) {
                throw new Error('Flat with this number already exists');
            }
        }
        return await FlatRepository.create(flatData);
    }

    async updateFlat(id, updateData, userId = null) {
        return await FlatRepository.update(id, updateData, userId);
    }

    async deleteFlat(id, userId = null) {
        return await FlatRepository.delete(id, userId);
    }
}

module.exports = new FlatService();
