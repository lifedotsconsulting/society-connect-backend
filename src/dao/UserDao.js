const BaseDao = require('./BaseDao');
const { User } = require('../models');

class UserDao extends BaseDao {
    constructor() {
        super(User);
    }

    // You can add User-specific DAO methods here, e.g., findByEmail
    async findByEmail(email) {
        const users = await this.findAll({ email });
        return users.length > 0 ? users[0] : null;
    }

    async findByFlatNumber(flatNumber) {
        const users = await this.findAll({ flatNumber });
        return users.length > 0 ? users[0] : null;
    }
}

module.exports = new UserDao(); // Export singleton instance
