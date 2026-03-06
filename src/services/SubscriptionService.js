const { SubscriptionRepository } = require('../repositories');

class SubscriptionService {
    async getAllSubscriptions(filters = {}) {
        return await SubscriptionRepository.findAll(filters);
    }

    async getSubscriptionById(id) {
        return await SubscriptionRepository.findById(id);
    }

    async createSubscription(subData) {
        return await SubscriptionRepository.create(subData);
    }

    async updateSubscription(id, updateData) {
        return await SubscriptionRepository.update(id, updateData);
    }

    async deleteSubscription(id) {
        return await SubscriptionRepository.delete(id);
    }
}

module.exports = new SubscriptionService();
