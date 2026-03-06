const { UserRepository } = require('../repositories');
// Placeholder for future logic like password hashing (bcrypt)
// const bcrypt = require('bcrypt');

class UserService {
    async getAllUsers(filters = {}) {
        return await UserRepository.findAll(filters);
    }

    async getUserById(id) {
        return await UserRepository.findById(id);
    }

    async createUser(userData) {
        // Business logic: check if user already exists
        if (userData.email) {
            const existing = await UserRepository.findByEmail(userData.email);
            if (existing) {
                throw new Error('User with this email already exists');
            }
        }

        // Business logic: hash password
        /*
        if (userData.password) {
            userData.passwordHash = await bcrypt.hash(userData.password, 10);
            delete userData.password;
        }
        */

        return await UserRepository.create(userData);
    }

    async updateUser(id, updateData, adminUserId = null) {
        // Business logic: prevent updating certain fields
        delete updateData.identity;
        delete updateData.passwordHash; // Handled by separate endpoint usually

        return await UserRepository.update(id, updateData, adminUserId);
    }

    async deleteUser(id, adminUserId = null) {
        return await UserRepository.delete(id, adminUserId);
    }
}

module.exports = new UserService();
