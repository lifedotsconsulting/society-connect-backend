const BaseModel = require('./BaseModel');

class Vehicle extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.registrationNumner = data.registrationNumner || data.registration_numner || ''; // Typo kept from schema
        this.type = data.type || '';
        this.model = data.model || '';
        this.photoUrl = data.photoUrl || data.photo_url || '';
        this.ownerId = data.ownerId || data.owner_id || null;
        this.parkingSlot = data.parkingSlot || data.parking_slot || '';
    }
}

module.exports = Vehicle;
