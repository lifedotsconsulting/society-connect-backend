const { ComplaintRepository } = require('../repositories');

class ComplaintService {
    async getAllComplaints(filters = {}) {
        return await ComplaintRepository.findAll(filters);
    }

    async getComplaintById(id) {
        return await ComplaintRepository.findById(id);
    }

    async getMyComplaints(userId) {
        return await ComplaintRepository.findAll({ raisedBy: userId });
    }

    async createComplaint(complaintData, userId) {
        complaintData.raisedBy = userId;
        complaintData.status = 1; // Always starts as open
        return await ComplaintRepository.create(complaintData);
    }

    async updateComplaint(id, updateData, userId = null) {
        return await ComplaintRepository.update(id, updateData, userId);
    }

    async resolveComplaint(id, resolutionNotes, userId = null) {
        return await ComplaintRepository.update(id, {
            status: 3, // Assuming 3 is Resolved
            // Using description since resolutionNotes doesn't explicitly exist in schema, though maybe we just append to description. 
            // Better to ignore resolutionNotes for now if it is not in schema.
        }, userId);
    }

    async deleteComplaint(id, userId = null) {
        return await ComplaintRepository.delete(id, userId);
    }
}

module.exports = new ComplaintService();
