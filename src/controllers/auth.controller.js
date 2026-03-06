const authService = require('../services/auth.service');
const tokenService = require('../services/token.service');

const login = async (req, res, next) => {
    try {
        const { username, password, deviceId } = req.body;

        // 1. Authenticate user by username/flatNumber
        // Assuming authService can handle username or flatNumber
        console.log(username, password, deviceId);
        const user = await authService.loginUserWithFlatAndPass(username, password, deviceId);

        // 2. Generate tokens
        const tokens = await tokenService.generateAuthTokens(user);

        // Do not return passwordHash
        const { passwordHash, ...profileData } = user;

        // 3. Return user data and token
        res.status(200).json({ user: profileData, tokens });
    } catch (error) {
        if (error.statusCode) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            next(error);
        }
    }
};

const logout = async (req, res, next) => {
    try {
        // In a real app, you would invalidate the refresh token here
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
    logout
};
