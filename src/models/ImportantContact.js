const BaseModel = require('./BaseModel');

class ImportantContact extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.societyId = data.societyId || data.society_id || null;
        this.name = data.name || '';
        this.phone = data.phone || '';
        this.email = data.email || '';
        this.category = data.category || '';
    }
}

module.exports = ImportantContact;
