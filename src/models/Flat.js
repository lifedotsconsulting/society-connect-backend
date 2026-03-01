const BaseModel = require('./BaseModel');

class Flat extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.flatNumber = data.flatNumber || '';
        this.block = data.block || '';
        this.floor = data.floor || 1;
        this.bhk = data.bhk || '2BHK';
        this.occupancyStatus = data.occupancyStatus || 'Vacant'; // 'Vacant', 'Owner', 'Tenant'
        this.currentResidentId = data.currentResidentId || null;
        this.ownerId = data.ownerId || null;
    }
}

module.exports = Flat;
