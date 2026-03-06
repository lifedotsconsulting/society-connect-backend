const { ComplaintRepository } = require('../repositories');

class ComplaintService {
    async getAllComplaints(filters = {}) {
        return await ComplaintRepository.findAll(filters);
    }

    async getComplaintById(id) {
        return await ComplaintRepository.findById(id);
    }

    async getMyComplaints(userId) {
        // Replaced findByRaisedBy with findAll and filter
        return await ComplaintRepository.findAll({ raisedByUserId: userId });
    }

    async createComplaint(complaintData, userId) {
        // Business logic: enforce raisedBy is the logged-in user
        complaintData.raisedByUserId = userId;
        complaintData.status = 'Open'; // Always starts as open
        return await ComplaintRepository.create(complaintData);
    }

    async updateComplaint(id, updateData, userId = null) {
        return await ComplaintRepository.update(id, updateData, userId);
    }

    async resolveComplaint(id, resolutionNotes, userId = null) {
        return await ComplaintRepository.update(id, {
            status: 'Resolved',
            resolutionNotes
        }, userId);
    }

    async deleteComplaint(id, userId = null) {
        return await ComplaintRepository.delete(id, userId);
    }
}

module.exports = new ComplaintService();
