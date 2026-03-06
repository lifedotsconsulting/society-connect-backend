const BaseModel = require('./BaseModel');

class Complaint extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.raisedBy = data.raisedBy || data.raised_by || null;
        this.flatId = data.flatId || data.flat_id || null;
        this.title = data.title || '';
        this.status = data.status || 1;
        this.category = data.category || 1;
        this.priority = data.priority || '';
    }
}

module.exports = Complaint;
