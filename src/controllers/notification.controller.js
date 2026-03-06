const { NotificationService } = require('../services');

class NotificationController {
    async getUserNotifications(req, res) {
        try {
            const userId = req.user ? req.user.identity : req.query.userId;
            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }
            const notifications = await NotificationService.getUserNotifications(userId, req.query);
            res.status(200).json(notifications);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createNotification(req, res) {
        try {
            const notifData = { ...req.body };
            notifData.createdBy = req.user ? req.user.identity : null;
            const notification = await NotificationService.createNotification(notifData);
            res.status(201).json(notification);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async markAsRead(req, res) {
        try {
            const notification = await NotificationService.markAsRead(req.params.id);
            if (!notification) return res.status(404).json({ error: 'Notification not found' });
            res.status(200).json(notification);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteNotification(req, res) {
        try {
            const success = await NotificationService.deleteNotification(req.params.id);
            if (!success) return res.status(404).json({ error: 'Notification not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new NotificationController();
