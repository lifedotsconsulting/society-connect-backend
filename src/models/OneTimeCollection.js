const BaseModel = require('./BaseModel');

class OneTimeCollection extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.societyId = data.societyId || data.society_id || null;
        this.title = data.title || '';
        // description natively mapped
        this.collectionType = data.collectionType || data.collection_type || 1;
        this.totalTargetAmount = data.totalTargetAmount || data.total_target_amount || 0;
        this.perFlatAmount = data.perFlatAmount || data.per_flat_amount || 0;
        this.calculationMethod = data.calculationMethod || data.calculation_method || 1;
        this.dueDate = data.dueDate || data.due_date || null;
        this.lateFee = data.lateFee || data.late_fee || 0;
        this.lateFeeGraceDays = data.lateFeeGraceDays || data.late_fee_grace_days || 0;
        this.status = data.status || 1;
    }
}

module.exports = OneTimeCollection;
