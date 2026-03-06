const { PlanRepository } = require('../repositories');

class PlanService {
    async getAllPlans() {
        return await PlanRepository.findAll();
    }

    async getPlanById(id) {
        return await PlanRepository.findById(id);
    }

    async createPlan(planData) {
        return await PlanRepository.create(planData);
    }

    async updatePlan(id, updateData) {
        return await PlanRepository.update(id, updateData);
    }

    async deletePlan(id) {
        return await PlanRepository.delete(id);
    }
}

module.exports = new PlanService();
