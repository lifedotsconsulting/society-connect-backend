const BaseModel = require('./BaseModel');

class Document extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.societyId = data.societyId || data.society_id || null;
        this.title = data.title || '';
        this.documentType = data.documentType || data.document_type || '';
        this.fileUrl = data.fileUrl || data.file_url || '';

        // Map uploadedBy/uploadedAt to createdBy/createdAt
        this.createdBy = data.uploadedBy || data.uploaded_by || this.createdBy;
        this.createdAt = data.uploadedAt || data.uploaded_at || this.createdAt;
    }
}

module.exports = Document;
