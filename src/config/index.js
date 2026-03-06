require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    jwt: {
        secret: process.env.JWT_SECRET || 'dev-secret-key',
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },
    env: process.env.NODE_ENV || 'development',
    db: {
        server: process.env.DB_SERVER || 'localhost',
        name: process.env.DB_NAME || 'society_connect',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || ''
    }
};
