const { Pool } = require('pg');

const connectionPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = connectionPool;
