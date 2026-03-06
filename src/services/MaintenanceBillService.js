const { MaintenanceBillRepository } = require('../repositories');

class MaintenanceBillService {
    async getAllBills(filters = {}) {
        return await MaintenanceBillRepository.findAll(filters);
    }

    async getBillById(id) {
        return await MaintenanceBillRepository.findById(id);
    }

    async createBill(billData, userId) {
        billData.createdBy = userId;
        return await MaintenanceBillRepository.create(billData);
    }

    async updateBill(id, updateData) {
        return await MaintenanceBillRepository.update(id, updateData);
    }

    async deleteBill(id) {
        return await MaintenanceBillRepository.delete(id);
    }
}

module.exports = new MaintenanceBillService();
