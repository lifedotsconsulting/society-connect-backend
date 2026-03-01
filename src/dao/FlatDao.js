const BaseDao = require('./BaseDao');
const { Flat } = require('../models');

class FlatDao extends BaseDao {
    constructor() {
        super(Flat);
    }

    // Flat-specific DAO methods
    async findByFlatNumber(flatNumber) {
        const flats = await this.findAll({ flatNumber });
        return flats.length > 0 ? flats[0] : null;
    }
}

module.exports = new FlatDao();
