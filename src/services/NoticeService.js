const { NoticeRepository } = require('../repositories');

class NoticeService {
    async getAllNotices(filters = {}) {
        return await NoticeRepository.findAll(filters);
    }

    async getNoticeById(id) {
        return await NoticeRepository.findById(id);
    }

    async createNotice(noticeData, userId) {
        noticeData.createdBy = userId;
        return await NoticeRepository.create(noticeData);
    }

    async updateNotice(id, updateData) {
        return await NoticeRepository.update(id, updateData);
    }

    async deleteNotice(id) {
        return await NoticeRepository.delete(id);
    }
}

module.exports = new NoticeService();
