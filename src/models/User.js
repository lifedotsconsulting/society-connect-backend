const BaseModel = require('./BaseModel');

class User extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.flatNumber = data.flatNumber || '';
        this.name = data.name || '';
        this.role = data.role || 'Resident'; // e.g., 'Resident', 'Admin'
        this.email = data.email || '';
        this.phone = data.phone || '';
        this.passwordHash = data.passwordHash || '';
        this.deviceId = data.deviceId || null; // For single device policy enforcing
    }
}

module.exports = User;
