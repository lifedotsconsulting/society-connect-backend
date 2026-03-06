const { VehicleRepository } = require('../repositories');

class VehicleService {
    async getAllVehicles(filters = {}) {
        return await VehicleRepository.findAll(filters);
    }

    async getVehicleById(id) {
        return await VehicleRepository.findById(id);
    }

    async getMyVehicles(userId) {
        return await VehicleRepository.findAll({ ownerId: userId });
    }

    async createVehicle(vehicleData, userId) {
        vehicleData.ownerId = userId;

        if (vehicleData.registrationNumner) {
            const results = await VehicleRepository.findAll({ registrationNumner: vehicleData.registrationNumner });
            const existing = results.length > 0 ? results[0] : null;
            if (existing) {
                throw new Error('Vehicle with this registration number already exists');
            }
        }

        return await VehicleRepository.create(vehicleData);
    }

    async updateVehicle(id, updateData, userId = null) {
        return await VehicleRepository.update(id, updateData, userId);
    }

    async deleteVehicle(id, userId = null) {
        return await VehicleRepository.delete(id, userId);
    }
}

module.exports = new VehicleService();
