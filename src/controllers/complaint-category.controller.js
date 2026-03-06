const { ComplaintCategoryService } = require('../services');

class ComplaintCategoryController {
    async getAllCategories(req, res) {
        try {
            const categories = await ComplaintCategoryService.getAllCategories(req.query);
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCategoryById(req, res) {
        try {
            const category = await ComplaintCategoryService.getCategoryById(req.params.id);
            if (!category) return res.status(404).json({ error: 'Category not found' });
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createCategory(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const category = await ComplaintCategoryService.createCategory(req.body, userId);
            res.status(201).json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateCategory(req, res) {
        try {
            const category = await ComplaintCategoryService.updateCategory(req.params.id, req.body);
            if (!category) return res.status(404).json({ error: 'Category not found' });
            res.status(200).json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteCategory(req, res) {
        try {
            const success = await ComplaintCategoryService.deleteCategory(req.params.id);
            if (!success) return res.status(404).json({ error: 'Category not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ComplaintCategoryController();
