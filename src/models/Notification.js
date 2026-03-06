const BaseModel = require('./BaseModel');

class Notification extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.societyId = data.societyId || data.society_id || null;
        this.userId = data.userId || data.user_id || null;
        this.title = data.title || '';
        this.message = data.message || '';
        this.notificationType = data.notificationType || data.notification_type || 1;
        this.isRead = data.isRead !== undefined ? data.isRead : (data.is_read !== undefined ? data.is_read : false);
    }
}

module.exports = Notification;
