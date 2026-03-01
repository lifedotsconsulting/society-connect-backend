const BaseModel = require('./BaseModel');

class Complaint extends BaseModel {
    constructor(data = {}) {
        super(data);
        this.title = data.title || '';
        this.category = data.category || 'General'; // e.g., 'Plumbing', 'Electrical', 'Security'
        this.status = data.status || 'Open'; // 'Open', 'In Progress', 'Resolved', 'Closed'
        this.priority = data.priority || 'Medium'; // 'Low', 'Medium', 'High', 'Critical'
        this.raisedByUserId = data.raisedByUserId || null;
        this.raisedForFlat = data.raisedForFlat || '';
        this.assignedTo = data.assignedTo || null; // e.g., Vendor or staff ID
        this.resolutionNotes = data.resolutionNotes || '';
    }
}

module.exports = Complaint;
