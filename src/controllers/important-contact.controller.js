const { ImportantContactService } = require('../services');

class ImportantContactController {
    async getAllContacts(req, res) {
        try {
            const contacts = await ImportantContactService.getAllContacts(req.query);
            res.status(200).json(contacts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getContactById(req, res) {
        try {
            const contact = await ImportantContactService.getContactById(req.params.id);
            if (!contact) return res.status(404).json({ error: 'Contact not found' });
            res.status(200).json(contact);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createContact(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const contact = await ImportantContactService.createContact(req.body, userId);
            res.status(201).json(contact);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateContact(req, res) {
        try {
            const contact = await ImportantContactService.updateContact(req.params.id, req.body);
            if (!contact) return res.status(404).json({ error: 'Contact not found' });
            res.status(200).json(contact);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteContact(req, res) {
        try {
            const success = await ImportantContactService.deleteContact(req.params.id);
            if (!success) return res.status(404).json({ error: 'Contact not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ImportantContactController();
