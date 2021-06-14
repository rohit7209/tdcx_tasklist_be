const { Pool } = require('pg');

const connectionPool = new Pool({
  // process.env.DATABASE_URL,
  connectionString: 'postgres://qvgovdhnjxljio:b0d198d422861758b395d2d20676cfad268f5a1ad5bb04fcbe4d4de4fe799f21@ec2-52-86-25-51.compute-1.amazonaws.com:5432/dd8s1bj6vkllpr',
  ssl: { rejectUnauthorized: false },
});

module.exports = connectionPool;
