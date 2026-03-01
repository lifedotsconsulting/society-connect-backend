const BaseModel = require('./BaseModel');

class Event extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.title = data.title || '';
        // description is already present in BaseModel
        this.eventDate = data.eventDate || new Date();
        this.endDate = data.endDate || new Date();
        this.location = data.location || '';
        this.organizer = data.organizer || ''; // e.g., "Managing Committee", "Culture Club"
        this.category = data.category || 'General'; // 'Meeting', 'Festival', 'Sports'
        this.isPublished = data.isPublished !== undefined ? data.isPublished : false;
    }
}

module.exports = Event;
