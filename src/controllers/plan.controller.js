const { PlanService } = require('../services');

class PlanController {
    async getAllPlans(req, res) {
        try {
            const plans = await PlanService.getAllPlans(req.query);
            res.status(200).json(plans);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPlanById(req, res) {
        try {
            const plan = await PlanService.getPlanById(req.params.id);
            if (!plan) return res.status(404).json({ error: 'Plan not found' });
            res.status(200).json(plan);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createPlan(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const plan = await PlanService.createPlan(req.body, userId);
            res.status(201).json(plan);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updatePlan(req, res) {
        try {
            const plan = await PlanService.updatePlan(req.params.id, req.body);
            if (!plan) return res.status(404).json({ error: 'Plan not found' });
            res.status(200).json(plan);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deletePlan(req, res) {
        try {
            const success = await PlanService.deletePlan(req.params.id);
            if (!success) return res.status(404).json({ error: 'Plan not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PlanController();
