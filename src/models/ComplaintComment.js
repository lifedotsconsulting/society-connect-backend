const BaseModel = require('./BaseModel');

class ComplaintComment extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.complaintId = data.complaintId || data.complaint_id || null;
        this.userId = data.userId || data.user_id || null;
        this.comment = data.comment || '';
        this.parentCommentId = data.parentCommentId || data.parent_comment_id || null;
    }
}

module.exports = ComplaintComment;
