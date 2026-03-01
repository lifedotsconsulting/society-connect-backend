const { ComplaintDao } = require('../dao');

class ComplaintService {
    async getAllComplaints(filters = {}) {
        return await ComplaintDao.findAll(filters);
    }

    async getComplaintById(id) {
        return await ComplaintDao.findById(id);
    }

    async getMyComplaints(userId) {
        return await ComplaintDao.findByRaisedBy(userId);
    }

    async createComplaint(complaintData, userId) {
        // Business logic: enforce raisedBy is the logged-in user
        complaintData.raisedByUserId = userId;
        complaintData.status = 'Open'; // Always starts as open
        return await ComplaintDao.create(complaintData);
    }

    async updateComplaint(id, updateData, userId = null) {
        return await ComplaintDao.update(id, updateData, userId);
    }

    async resolveComplaint(id, resolutionNotes, userId = null) {
        return await ComplaintDao.update(id, {
            status: 'Resolved',
            resolutionNotes
        }, userId);
    }

    async deleteComplaint(id, userId = null) {
        return await ComplaintDao.delete(id, userId);
    }
}

module.exports = new ComplaintService();
