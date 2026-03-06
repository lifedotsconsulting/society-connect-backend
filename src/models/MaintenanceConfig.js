const BaseModel = require('./BaseModel');

class MaintenanceConfig extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.societyId = data.societyId || data.soceity_id || null;
        this.billingCycle = data.billingCycle !== undefined ? data.billingCycle : (data.billing_cycle !== undefined ? data.billing_cycle : 0);
        this.calculationMethod = data.calculationMethod !== undefined ? data.calculationMethod : (data.calculation_method !== undefined ? data.calculation_method : 0);
        this.amount = data.amount || 0;
        this.amountPerSqft = data.amountPerSqft || data.amount_per_sqft || 0;
        this.lateFee = data.lateFee || data.late_fee || 0;
        this.lateFeeGraceDays = data.lateFeeGraceDays || data.late_fee_grace_days || 0;
        this.dueDayOfMonth = data.dueDayOfMonth || data.due_day_of_month || 1;
        this.startDate = data.startDate || data.start_date || new Date();
        this.endDate = data.endDate || data.end_date || null;
        this.isActive = data.isActive !== undefined ? data.isActive : (data.is_active !== undefined ? data.is_active : true);
    }
}

module.exports = MaintenanceConfig;
