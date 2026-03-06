const User = require('./User');

class SocietyMember extends User {
    constructor(data = {}) {
        super(data);
        this.societyId = data.societyId || data.society_id || null;
        this.flatId = data.flatId || data.flat_id || null;
        this.role = data.role || '';
    }
}

module.exports = SocietyMember;
