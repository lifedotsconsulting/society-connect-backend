const { ComplaintCommentService } = require('../services');

class ComplaintCommentController {
    async getCommentsByComplaintId(req, res) {
        try {
            const comments = await ComplaintCommentService.getCommentsByComplaintId(req.params.complaintId);
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCommentById(req, res) {
        try {
            const comment = await ComplaintCommentService.getCommentById(req.params.id);
            if (!comment) return res.status(404).json({ error: 'Comment not found' });
            res.status(200).json(comment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addComment(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const commentData = { ...req.body, complaintId: req.params.complaintId };
            const comment = await ComplaintCommentService.addComment(commentData, userId);
            res.status(201).json(comment);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateComment(req, res) {
        try {
            const comment = await ComplaintCommentService.updateComment(req.params.id, req.body);
            if (!comment) return res.status(404).json({ error: 'Comment not found' });
            res.status(200).json(comment);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteComment(req, res) {
        try {
            const success = await ComplaintCommentService.deleteComment(req.params.id);
            if (!success) return res.status(404).json({ error: 'Comment not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ComplaintCommentController();
