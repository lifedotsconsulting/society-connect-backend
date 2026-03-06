const db = require('./src/services/db.service');

async function testConnection() {
    try {
        console.log('Testing MySQL Connection...');
        const results = await db.query('SELECT 1 + 1 AS solution');
        console.log('Connection successful! Result of SELECT 1 + 1:', results[0].solution);
    } catch (error) {
        console.error('Connection failed:', error.message);
    } finally {
        process.exit();
    }
}

testConnection();
