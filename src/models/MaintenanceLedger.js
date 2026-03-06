const BaseModel = require('./BaseModel');

class MaintenanceLedger extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.societyId = data.societyId || data.society_id || null;
        this.flatId = data.flatId || data.flat_id || null;
        this.billId = data.billId || data.bill_id || null;
        this.transactionType = data.transactionType || data.transaction_type || 1;
        this.amount = data.amount || 0;
        this.balance = data.balance || 0;
    }
}

module.exports = MaintenanceLedger;
