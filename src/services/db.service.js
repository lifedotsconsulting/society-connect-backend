const mysql = require('mysql2/promise');
const config = require('../config');

// Create a connection pool
const pool = mysql.createPool({
    host: config.db.server,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = {
    query: async (sql, params) => {
        //  console.log(sql, params);
        //console.log(config.db.server);
        const [results,] = await pool.execute(sql, params);
        return results;
    },
    pool
};
