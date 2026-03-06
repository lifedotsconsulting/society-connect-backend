const BaseModel = require('./BaseModel');

class Subscription extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.societyId = data.societyId || data.society_id || null;
        this.planId = data.planId || data.plan_id || null;
        this.billingCycle = data.billingCycle || data.billing_cycle || '';
        this.startDate = data.startDate || data.start_date || null;
        this.endDate = data.endDate || data.end_date || null;
        this.status = data.status !== undefined ? data.status : (data.is_active !== undefined ? data.is_active : true);
    }
}

module.exports = Subscription;
