const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Generate JWT token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, secret = config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: Math.floor(Date.now() / 1000),
        exp: expires,
    };
    return jwt.sign(payload, secret);
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
    // Generate token valid for specified config time (e.g. 7 days = 604800 seconds)
    // For simplicity using hardcoded expiry seconds if config not set cleanly
    const expires = Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60);
    const accessToken = generateToken(user.id, expires);

    return {
        access: {
            token: accessToken,
            expires: new Date(expires * 1000),
        },
    };
};

module.exports = {
    generateToken,
    generateAuthTokens,
};
