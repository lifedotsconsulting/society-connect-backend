const { NotificationRepository } = require('../repositories');

class NotificationService {
    async getUserNotifications(userId, filters = {}) {
        return await NotificationRepository.findAll({ ...filters, userId });
    }

    async createNotification(notifData) {
        return await NotificationRepository.create(notifData);
    }

    async markAsRead(id) {
        return await NotificationRepository.update(id, { isRead: true });
    }

    async deleteNotification(id) {
        return await NotificationRepository.delete(id);
    }
}

module.exports = new NotificationService();
