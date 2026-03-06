const { MaintenancePaymentService } = require('../services');

class MaintenancePaymentController {
    async getAllPayments(req, res) {
        try {
            const payments = await MaintenancePaymentService.getAllPayments(req.query);
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPaymentById(req, res) {
        try {
            const payment = await MaintenancePaymentService.getPaymentById(req.params.id);
            if (!payment) return res.status(404).json({ error: 'Maintenance Payment not found' });
            res.status(200).json(payment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createPayment(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const payment = await MaintenancePaymentService.createPayment(req.body, userId);
            res.status(201).json(payment);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updatePayment(req, res) {
        try {
            const payment = await MaintenancePaymentService.updatePayment(req.params.id, req.body);
            if (!payment) return res.status(404).json({ error: 'Maintenance Payment not found' });
            res.status(200).json(payment);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deletePayment(req, res) {
        try {
            const success = await MaintenancePaymentService.deletePayment(req.params.id);
            if (!success) return res.status(404).json({ error: 'Maintenance Payment not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new MaintenancePaymentController();
