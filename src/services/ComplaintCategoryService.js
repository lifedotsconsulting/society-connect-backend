const { ComplaintCategoryRepository } = require('../repositories');

class ComplaintCategoryService {
    async getAllCategories(filters = {}) {
        return await ComplaintCategoryRepository.findAll(filters);
    }

    async getCategoryById(id) {
        return await ComplaintCategoryRepository.findById(id);
    }

    async createCategory(categoryData, userId) {
        categoryData.createdBy = userId;
        return await ComplaintCategoryRepository.create(categoryData);
    }

    async updateCategory(id, updateData) {
        return await ComplaintCategoryRepository.update(id, updateData);
    }

    async deleteCategory(id) {
        return await ComplaintCategoryRepository.delete(id);
    }
}

module.exports = new ComplaintCategoryService();
