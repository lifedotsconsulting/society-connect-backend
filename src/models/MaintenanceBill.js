const BaseModel = require('./BaseModel');

class MaintenanceBill extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.societyId = data.societyId || data.society_id || null;
        this.flatId = data.flatId || data.flat_id || null;
        this.cycleId = data.cycleId || data.cycle_id || null;
        this.baseAmount = data.baseAmount || data.base_amount || 0;
        this.penaltyAmount = data.penaltyAmount || data.penalty_amount || 0;
        this.discountAmount = data.discountAmount || data.discount_amount || 0;
        this.totalAmount = data.totalAmount || data.total_amount || 0;
        this.dueDate = data.dueDate || data.due_date || null;
        this.status = data.status || 1;
    }
}

module.exports = MaintenanceBill;
