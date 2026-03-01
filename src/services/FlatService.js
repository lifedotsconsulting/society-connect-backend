const { FlatDao } = require('../dao');

class FlatService {
    async getAllFlats(filters = {}) {
        return await FlatDao.findAll(filters);
    }

    async getFlatById(id) {
        return await FlatDao.findById(id);
    }

    async createFlat(flatData) {
        // Business logic: ensure unique flat number
        if (flatData.flatNumber) {
            const existing = await FlatDao.findByFlatNumber(flatData.flatNumber);
            if (existing) {
                throw new Error('Flat with this number already exists');
            }
        }
        return await FlatDao.create(flatData);
    }

    async updateFlat(id, updateData, userId = null) {
        return await FlatDao.update(id, updateData, userId);
    }

    async deleteFlat(id, userId = null) {
        return await FlatDao.delete(id, userId);
    }
}

module.exports = new FlatService();
