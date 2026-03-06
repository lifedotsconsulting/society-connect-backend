const { SubscriptionService } = require('../services');

class SubscriptionController {
    async getAllSubscriptions(req, res) {
        try {
            const subscriptions = await SubscriptionService.getAllSubscriptions(req.query);
            res.status(200).json(subscriptions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getSubscriptionById(req, res) {
        try {
            const subscription = await SubscriptionService.getSubscriptionById(req.params.id);
            if (!subscription) return res.status(404).json({ error: 'Subscription not found' });
            res.status(200).json(subscription);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createSubscription(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const subscription = await SubscriptionService.createSubscription(req.body, userId);
            res.status(201).json(subscription);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateSubscription(req, res) {
        try {
            const subscription = await SubscriptionService.updateSubscription(req.params.id, req.body);
            if (!subscription) return res.status(404).json({ error: 'Subscription not found' });
            res.status(200).json(subscription);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteSubscription(req, res) {
        try {
            const success = await SubscriptionService.deleteSubscription(req.params.id);
            if (!success) return res.status(404).json({ error: 'Subscription not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new SubscriptionController();
