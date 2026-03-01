const BaseDao = require('./BaseDao');
const { Complaint } = require('../models');

class ComplaintDao extends BaseDao {
    constructor() {
        super(Complaint);
    }

    // Complaint-specific DAO methods
    async findByRaisedBy(userId) {
        return await this.findAll({ raisedByUserId: userId });
    }

    async findByStatus(status) {
        return await this.findAll({ status });
    }
}

module.exports = new ComplaintDao();
