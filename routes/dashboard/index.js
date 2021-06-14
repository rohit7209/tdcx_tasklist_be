const express = require('express');
const router = express.Router();
const httpContext = require('express-http-context');
const { filter, slice } = require('lodash');
const handler = require('./../handler');

const getDashboardSummary = async () => {
  const user = httpContext.get('user');
  const db = httpContext.get('dbPool');

  const { rows } = await db.query(`SELECT * FROM "tasks" WHERE "user"='${user.id}' order by "created_at" DESC`);

  return {
    'tasksCompleted': filter(rows, (e) => e.completed).length,
    'totalTasks': rows.length,
    'latestTasks': slice(rows, 0, 3),
  };
};


router.get('/', handler(getDashboardSummary));

module.exports = router;

