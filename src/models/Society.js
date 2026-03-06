const BaseModel = require('./BaseModel');

class Society extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.name = data.name || '';
        this.location = data.location || '';
        this.address = data.address !== undefined ? data.address : '{"address_line1":"", "address_line2":"", "survey": "", "road": "", "area": "", "town": "", "landmark": "", "city": "", "state": "", "pincode": "", "country": ""}';
        this.email = data.email || '';
        this.phone = data.phone || '';
        this.status = data.status !== undefined ? data.status : 1;
        this.registrationNumber = data.registrationNumber || data.registration_number || '';
        this.logoUrl = data.logoUrl || data.logo_url || '';
        this.theme = data.theme || '';
    }
}

module.exports = Society;
