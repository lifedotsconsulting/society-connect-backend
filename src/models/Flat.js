const BaseModel = require('./BaseModel');

class Flat extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.number = data.number || '';
        this.block = data.block || '';
        this.floor = data.floor || '';
        this.size = data.size || '';
        this.occupancyStatus = data.occupancyStatus || data.occupancy_status || '';
        this.currentResident = data.currentResident || data.current_resident || null;
        this.ownerId = data.ownerId || data.owner_id || null;
    }
}

module.exports = Flat;
