const { RoleRepository } = require('../repositories');

class RoleService {
    async getAllRoles(filters = {}) {
        return await RoleRepository.findAll(filters);
    }

    async getRoleById(id) {
        return await RoleRepository.findById(id);
    }

    async createRole(roleData, userId) {
        roleData.createdBy = userId;
        return await RoleRepository.create(roleData);
    }

    async updateRole(id, updateData) {
        return await RoleRepository.update(id, updateData);
    }

    async deleteRole(id) {
        return await RoleRepository.delete(id);
    }
}

module.exports = new RoleService();
