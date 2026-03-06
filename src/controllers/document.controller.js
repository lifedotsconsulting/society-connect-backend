const { DocumentService } = require('../services');

class DocumentController {
    async getAllDocuments(req, res) {
        try {
            const documents = await DocumentService.getAllDocuments(req.query);
            res.status(200).json(documents);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getDocumentById(req, res) {
        try {
            const document = await DocumentService.getDocumentById(req.params.id);
            if (!document) return res.status(404).json({ error: 'Document not found' });
            res.status(200).json(document);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createDocument(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const document = await DocumentService.createDocument(req.body, userId);
            res.status(201).json(document);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateDocument(req, res) {
        try {
            const document = await DocumentService.updateDocument(req.params.id, req.body);
            if (!document) return res.status(404).json({ error: 'Document not found' });
            res.status(200).json(document);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteDocument(req, res) {
        try {
            const success = await DocumentService.deleteDocument(req.params.id);
            if (!success) return res.status(404).json({ error: 'Document not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new DocumentController();
