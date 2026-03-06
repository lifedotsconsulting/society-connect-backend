const { RolePermissionRepository } = require('../repositories');

class RolePermissionService {
    async getPermissionsByRoleId(roleId) {
        return await RolePermissionRepository.findAll({ roleId });
    }

    async getRolePermissionById(id) {
        return await RolePermissionRepository.findById(id);
    }

    async addRolePermission(rpData) {
        return await RolePermissionRepository.create(rpData);
    }

    async updateRolePermission(id, updateData) {
        return await RolePermissionRepository.update(id, updateData);
    }

    async deleteRolePermission(id) {
        return await RolePermissionRepository.delete(id);
    }
}

module.exports = new RolePermissionService();
