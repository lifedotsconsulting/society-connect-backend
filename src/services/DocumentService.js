const { DocumentRepository } = require('../repositories');

class DocumentService {
    async getAllDocuments(filters = {}) {
        return await DocumentRepository.findAll(filters);
    }

    async getDocumentById(id) {
        return await DocumentRepository.findById(id);
    }

    async createDocument(docData, userId) {
        docData.uploadedBy = userId;
        return await DocumentRepository.create(docData);
    }

    async updateDocument(id, updateData) {
        return await DocumentRepository.update(id, updateData);
    }

    async deleteDocument(id) {
        return await DocumentRepository.delete(id);
    }
}

module.exports = new DocumentService();
