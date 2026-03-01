const { ComplaintService } = require('../services');

class ComplaintController {
    async getAllComplaints(req, res) {
        try {
            const complaints = await ComplaintService.getAllComplaints(req.query);
            res.status(200).json(complaints);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getMyComplaints(req, res) {
        try {
            // Need a valid user ID logic here, assuming req.user comes from token
            if (!req.user || !req.user.identity) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const complaints = await ComplaintService.getMyComplaints(req.user.identity);
            res.status(200).json(complaints);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getComplaintById(req, res) {
        try {
            const complaint = await ComplaintService.getComplaintById(req.params.id);
            if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
            res.status(200).json(complaint);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createComplaint(req, res) {
        try {
            const userId = req.user ? req.user.identity : 'system_or_anon_for_now';
            const complaint = await ComplaintService.createComplaint(req.body, userId);
            res.status(201).json(complaint);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateComplaint(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const complaint = await ComplaintService.updateComplaint(req.params.id, req.body, userId);
            if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
            res.status(200).json(complaint);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteComplaint(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const success = await ComplaintService.deleteComplaint(req.params.id, userId);
            if (!success) return res.status(404).json({ error: 'Complaint not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ComplaintController();
