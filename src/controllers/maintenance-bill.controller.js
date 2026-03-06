const { MaintenanceBillService } = require('../services');

class MaintenanceBillController {
    async getAllBills(req, res) {
        try {
            // Support ?flatId=xyz filtering natively
            const bills = await MaintenanceBillService.getAllBills(req.query);
            res.status(200).json(bills);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getBillById(req, res) {
        try {
            const bill = await MaintenanceBillService.getBillById(req.params.id);
            if (!bill) return res.status(404).json({ error: 'Maintenance Bill not found' });
            res.status(200).json(bill);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createBill(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const bill = await MaintenanceBillService.createBill(req.body, userId);
            res.status(201).json(bill);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateBill(req, res) {
        try {
            const bill = await MaintenanceBillService.updateBill(req.params.id, req.body);
            if (!bill) return res.status(404).json({ error: 'Maintenance Bill not found' });
            res.status(200).json(bill);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteBill(req, res) {
        try {
            const success = await MaintenanceBillService.deleteBill(req.params.id);
            if (!success) return res.status(404).json({ error: 'Maintenance Bill not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new MaintenanceBillController();
