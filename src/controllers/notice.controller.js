const { NoticeService } = require('../services');

class NoticeController {
    async getAllNotices(req, res) {
        try {
            const notices = await NoticeService.getAllNotices(req.query);
            res.status(200).json(notices);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getNoticeById(req, res) {
        try {
            const notice = await NoticeService.getNoticeById(req.params.id);
            if (!notice) return res.status(404).json({ error: 'Notice not found' });
            res.status(200).json(notice);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createNotice(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const notice = await NoticeService.createNotice(req.body, userId);
            res.status(201).json(notice);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateNotice(req, res) {
        try {
            const notice = await NoticeService.updateNotice(req.params.id, req.body);
            if (!notice) return res.status(404).json({ error: 'Notice not found' });
            res.status(200).json(notice);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteNotice(req, res) {
        try {
            const success = await NoticeService.deleteNotice(req.params.id);
            if (!success) return res.status(404).json({ error: 'Notice not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new NoticeController();
