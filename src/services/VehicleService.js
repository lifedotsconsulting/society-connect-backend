const { VehicleDao } = require('../dao');

class VehicleService {
    async getAllVehicles(filters = {}) {
        return await VehicleDao.findAll(filters);
    }

    async getVehicleById(id) {
        return await VehicleDao.findById(id);
    }

    async getMyVehicles(userId) {
        return await VehicleDao.findByOwner(userId);
    }

    async createVehicle(vehicleData, userId) {
        // Business logic: assign to current user
        vehicleData.ownerUserId = userId;

        // Check uniqueness
        if (vehicleData.vehicleNumber) {
            const existing = await VehicleDao.findByVehicleNumber(vehicleData.vehicleNumber);
            if (existing) {
                throw new Error('Vehicle with this registration number already exists');
            }
        }

        return await VehicleDao.create(vehicleData);
    }

    async updateVehicle(id, updateData, userId = null) {
        return await VehicleDao.update(id, updateData, userId);
    }

    async deleteVehicle(id, userId = null) {
        return await VehicleDao.delete(id, userId);
    }
}

module.exports = new VehicleService();
