const BaseModel = require('./BaseModel');

class MaintenanceCycle extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.societyId = data.societyId || data.soceity_id || null;
        this.configId = data.configId || data.config_id || null;
        this.cycleMonth = data.cycleMonth || data.cycle_month || 1;
        this.cycleYear = data.cycleYear || data.cycle_year || new Date().getFullYear();
        this.status = data.status || 1;
    }
}

module.exports = MaintenanceCycle;
