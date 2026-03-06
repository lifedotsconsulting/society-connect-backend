// In a real application, Mongoose User schemas would be used here. 
// For this migration, we will extract the mock data logic from the frontend auth.service so it's handled server-side.
const db = require('./db.service');
const HashService = require('./hash.service');
const UserRepository = require('../repositories/UserRepository');

const MOCK_SOCIETIES = [
    {
        id: 's1',
        name: 'Green Valley View',
        theme: {
            primary: '#3880ff',
            secondary: '#3dc2ff',
            tertiary: '#5260ff',
            success: '#2dd36f',
            warning: '#ffc409',
            danger: '#eb445a',
            dark: '#222428',
            medium: '#92949c',
            light: '#f4f5f8',
            logoUrl: 'assets/images/logo.png',
            logoSquareUrl: 'assets/images/logo-square.png'
        }
    }
];

class AuthError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

/**
 * Login with flat number and password
 * @param {string} flatNumber
 * @param {string} password
 * @param {string} deviceId
 */
const loginUserWithFlatAndPass = async (flatNumber, password, deviceId) => {
    if (!flatNumber || !password) {
        throw new AuthError('EMPTY', 400); // Bad Request
    }

    const hashedPassword = HashService.md5(password);
    // Query user by flatNumber and ensure the user is active
    const user = await UserRepository.findByUsernameAndPassword(flatNumber, hashedPassword);
    if (!user) {
        throw new AuthError('NOT_FOUND', 404);
    }

    // if (!HashService.compareMd5(hashedPassword, user.passwordHash)) {
    //     throw new AuthError('INVALID_PASS', 401);
    // }

    // Device Lock Logic (1 User per Flat per Device constraint)
    if (user.deviceId && user.deviceId !== deviceId) {
        // throw new AuthError('DEVICE_LOCKED', 403);
    }

    // If first time login or device matches, register/update the device ID
    if (user.deviceId !== deviceId) {
        if (deviceId) {
            await UserRepository.updateDeviceId(user.id, deviceId);
        }
        user.deviceId = deviceId;
    }

    // Exclude password from returned user object (if it's there)
    const { passwordHash, ...userWithoutPass } = user;

    return { ...userWithoutPass };
};

module.exports = {
    loginUserWithFlatAndPass,
};
