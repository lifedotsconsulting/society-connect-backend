const BaseModel = require('./BaseModel');

class Vehicle extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.vehicleNumber = data.vehicleNumber || '';
        this.type = data.type || '4-wheeler'; // '2-wheeler', '4-wheeler'
        this.make = data.make || '';
        this.model = data.model || '';
        this.color = data.color || '';
        this.ownerUserId = data.ownerUserId || null;
        this.flatNumber = data.flatNumber || '';
        this.parkingSlot = data.parkingSlot || '';
    }
}

module.exports = Vehicle;
