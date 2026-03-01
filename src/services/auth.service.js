// In a real application, Mongoose User schemas would be used here. 
// For this migration, we will extract the mock data logic from the frontend auth.service so it's handled server-side.

// Mock User DB
const MOCK_USERS = [
    { id: '1', name: 'John Doe', flatNumber: 'A101', role: 'Admin', pass: 'password123', registeredDeviceId: null, societyId: 's1' },
    { id: '2', name: 'Jane Smith', flatNumber: 'B403', role: 'FlatOwner', pass: 'password123', registeredDeviceId: null, societyId: 's1' },
    { id: '3', name: 'Bob Johnson', flatNumber: 'C202', role: 'Chairman', pass: 'password123', registeredDeviceId: null, societyId: 's1' }
];

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

    const user = MOCK_USERS.find(u => u.flatNumber.toLowerCase() === flatNumber.toLowerCase());

    if (!user) {
        throw new AuthError('NOT_FOUND', 404);
    }

    if (user.pass !== password) {
        throw new AuthError('INVALID_PASS', 401);
    }

    // Device Lock Logic (1 User per Flat per Device constraint)
    if (user.registeredDeviceId && user.registeredDeviceId !== deviceId) {
        // throw new AuthError('DEVICE_LOCKED', 403);
    }

    // If first time login or device matches, register/update the device ID
    user.registeredDeviceId = deviceId;

    // Find society
    const society = MOCK_SOCIETIES.find(s => s.id === user.societyId);

    // Exclude password from returned user object
    const { pass, ...userWithoutPass } = user;

    return { ...userWithoutPass, society };
};

module.exports = {
    loginUserWithFlatAndPass,
};
