const BaseModel = require('./BaseModel');

class Plan extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.planName = data.planName || data.plan_name || '';
        this.price = data.price || 0;
        this.maxFlats = data.maxFlats || data.max_flats || 10;
        this.featuresJson = data.featuresJson || data.features_json || '{}';
    }
}

module.exports = Plan;
