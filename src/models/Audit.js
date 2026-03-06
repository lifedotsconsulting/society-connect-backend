const BaseModel = require('./BaseModel');

class Audit extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.societyId = data.societyId || data.society_id || null;
        this.userId = data.userId || data.user_id || null;
        this.entityType = data.entityType || data.entity_type || 1;
        this.entityId = data.entityId || data.entity_id || null;
        this.action = data.action || 1;
        this.oldValue = data.oldValue || data.old_value || '';
        this.newValue = data.newValue || data.new_value || '';
    }
}

module.exports = Audit;
