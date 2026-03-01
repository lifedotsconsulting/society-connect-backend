const BaseDao = require('./BaseDao');
const { Vehicle } = require('../models');

class VehicleDao extends BaseDao {
    constructor() {
        super(Vehicle);
    }

    // Vehicle-specific DAO methods
    async findByOwner(userId) {
        return await this.findAll({ ownerUserId: userId });
    }

    async findByVehicleNumber(vehicleNumber) {
        const vehicles = await this.findAll({ vehicleNumber });
        return vehicles.length > 0 ? vehicles[0] : null;
    }
}

module.exports = new VehicleDao();
