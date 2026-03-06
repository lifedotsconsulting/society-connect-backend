const { UserService } = require('../services');

class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers(req.query);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getProfile(req, res) {
        try {
            // Assume req.user comes from token auth middleware later
            const userId = req.user ? req.user.identity : null;

            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized: User not identified. Missing token.' });
            }
            //console.log('userId: ', userId);
            const user = await UserService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User profile not found' });
            }

            // Do not return passwordHash
            const { passwordHash, ...profileData } = user;

            res.status(200).json(profileData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createUser(req, res) {
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            // Assume req.user comes from token auth middleware later
            const userId = req.user ? req.user.identity : null;
            const user = await UserService.updateUser(req.params.id, req.body, userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.user ? req.user.identity : null;
            const success = await UserService.deleteUser(req.params.id, userId);
            if (!success) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UserController();
