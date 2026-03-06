const BaseModel = require('./BaseModel');

class User extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.firstName = data.firstName || data.first_name || '';
        this.lastName = data.lastName || data.last_name || '';
        this.email = data.email || '';
        this.username = data.username || '';
        this.status = data.status || 1;
        this.role = data.role || null;
        this.society = data.society || null;
        this.deviceId = data.deviceId || data.device_id || null;
        this.lastLoginAt = data.lastLoginAt || data.last_login_at || null;
        this.profilePhotoUrl = data.profilePhotoUrl || data.profile_photo_url || '';
        this.preference = data.preference || '';
    }
}

module.exports = User;
