const BaseModel = require('./BaseModel');

class FinancialData extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.societyId = data.societyId || data.soceity_id || null; // Handling typo from schema
        this.currentMaintenanceCollected = data.currentMaintenanceCollected || data.current_maINTainance_collected || 0;
        this.currentMaintenancePending = data.currentMaintenancePending || data.current_maINTainance_pending || 0;
        this.cashReserve = data.cashReserve || data.cash_reserve || 0;
        this.totalExpenses = data.totalExpenses || data.total_expenses || 0;
        // createdAt/createdBy are not in the table definition explicitly but BaseModel provides defaults, we will only map updated_at/updated_by to DB
    }
}

module.exports = FinancialData;
