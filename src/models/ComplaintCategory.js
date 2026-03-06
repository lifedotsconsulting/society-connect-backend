const BaseModel = require('./BaseModel');

class ComplaintCategory extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.title = data.title || '';
        this.societyId = data.societyId || data.society_id || null;
        // BaseModel handles description
        this.isActive = data.isActive !== undefined ? data.isActive : (data.is_active !== undefined ? data.is_active : true);
        this.templates = data.templates || '';
    }
}

module.exports = ComplaintCategory;
