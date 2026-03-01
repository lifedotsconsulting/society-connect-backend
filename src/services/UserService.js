const { UserDao } = require('../dao');
// Placeholder for future logic like password hashing (bcrypt)
// const bcrypt = require('bcrypt');

class UserService {
    async getAllUsers(filters = {}) {
        return await UserDao.findAll(filters);
    }

    async getUserById(id) {
        return await UserDao.findById(id);
    }

    async createUser(userData) {
        // Business logic: check if user already exists
        if (userData.email) {
            const existing = await UserDao.findByEmail(userData.email);
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

        return await UserDao.create(userData);
    }

    async updateUser(id, updateData, adminUserId = null) {
        // Business logic: prevent updating certain fields
        delete updateData.identity;
        delete updateData.passwordHash; // Handled by separate endpoint usually

        return await UserDao.update(id, updateData, adminUserId);
    }

    async deleteUser(id, adminUserId = null) {
        return await UserDao.delete(id, adminUserId);
    }
}

module.exports = new UserService();
