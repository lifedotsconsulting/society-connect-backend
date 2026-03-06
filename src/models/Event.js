const BaseModel = require('./BaseModel');

class Event extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.societyId = data.societyId || data.society_id || null;
        this.categoryId = data.categoryId || data.category_id || null;
        this.title = data.title || '';
        this.eventType = data.eventType || data.event_type || 'Society';
        this.startDatetime = data.startDatetime || data.start_datetime || null;
        this.endDatetime = data.endDatetime || data.end_datetime || null;
        this.location = data.location || '';
        this.maxParticipants = data.maxParticipants || data.max_participants || null;
        this.registrationRequired = data.registrationRequired !== undefined ? data.registrationRequired : (data.registration_required !== undefined ? data.registration_required : false);
        this.ticketPrice = data.ticketPrice || data.ticket_price || 0;
        this.status = data.status || 1;
        this.members = data.members || data.memebrs || '[]'; // Typo from schema
        this.attachmentUrl = data.attachmentUrl || data.attachment_url || '';
    }
}

module.exports = Event;
