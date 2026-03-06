const { ImportantContactRepository } = require('../repositories');

class ImportantContactService {
    async getAllContacts(filters = {}) {
        return await ImportantContactRepository.findAll(filters);
    }

    async getContactById(id) {
        return await ImportantContactRepository.findById(id);
    }

    async createContact(contactData, userId) {
        contactData.createdBy = userId;
        return await ImportantContactRepository.create(contactData);
    }

    async updateContact(id, updateData) {
        return await ImportantContactRepository.update(id, updateData);
    }

    async deleteContact(id) {
        return await ImportantContactRepository.delete(id);
    }
}

module.exports = new ImportantContactService();
