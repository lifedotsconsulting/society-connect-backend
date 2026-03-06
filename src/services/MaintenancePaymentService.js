const { MaintenancePaymentRepository } = require('../repositories');

class MaintenancePaymentService {
    async getAllPayments(filters = {}) {
        return await MaintenancePaymentRepository.findAll(filters);
    }

    async getPaymentById(id) {
        return await MaintenancePaymentRepository.findById(id);
    }

    async createPayment(paymentData) {
        return await MaintenancePaymentRepository.create(paymentData);
    }

    async updatePayment(id, updateData) {
        return await MaintenancePaymentRepository.update(id, updateData);
    }

    async deletePayment(id) {
        return await MaintenancePaymentRepository.delete(id);
    }
}

module.exports = new MaintenancePaymentService();
