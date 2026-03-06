const BaseModel = require('./BaseModel');

class Notice extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.societyId = data.societyId || data.society_id || null;
        this.title = data.title || '';
        // description mapped natively via BaseModel
        this.attachmentUrl = data.attachmentUrl || data.attachment_url || '';
        this.publishDate = data.publishDate || data.publish_date || null;
        this.expiryDate = data.expiryDate || data.expiry_date || null;
        this.category = data.category || '';
    }
}

module.exports = Notice;
