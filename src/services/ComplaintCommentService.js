const { ComplaintCommentRepository } = require('../repositories');

class ComplaintCommentService {
    async getCommentsByComplaintId(complaintId) {
        return await ComplaintCommentRepository.findAll({ complaintId });
    }

    async getCommentById(id) {
        return await ComplaintCommentRepository.findById(id);
    }

    async addComment(commentData, userId) {
        commentData.createdBy = userId;
        commentData.userId = userId;
        return await ComplaintCommentRepository.create(commentData);
    }

    async updateComment(id, updateData) {
        return await ComplaintCommentRepository.update(id, updateData);
    }

    async deleteComment(id) {
        return await ComplaintCommentRepository.delete(id);
    }
}

module.exports = new ComplaintCommentService();
