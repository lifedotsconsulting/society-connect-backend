const BaseModel = require('./BaseModel');

class Role extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.name = data.name || '';
        this.isDefault = data.isDefault !== undefined ? data.isDefault : (data.is_default !== undefined ? data.is_default : false);
        this.societyId = data.societyId || data.society_id || null;
    }
}

module.exports = Role;
