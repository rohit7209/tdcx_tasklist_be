const express = require('express');
const router = express.Router();
const httpContext = require('express-http-context');
const { v4: uuid } = require('uuid');
const handler = require('./../handler');

const getTasks = async () => {
  const user = httpContext.get('user');
  const db = httpContext.get('dbPool');
  const { rows } = await db.query(`SELECT id, name, completed FROM "tasks" WHERE "user"='${user.id}' order by "created_at" DESC`);
  return rows;
};

const createTask = async ({ body }) => {
  const user = httpContext.get('user');
  const db = httpContext.get('dbPool');
  const logger = httpContext.get('logger');

  const { name } = body;
  if (!name) {
    throw new Error('Valid name is required for task!');
  }

  logger.info('creatign task name:', name);

  const { rows } = await db.query(`
    INSERT INTO "tasks" (id, "user", name, completed, created_at, updated_at)
    VALUES ('${uuid()}', '${user.id}', '${name}', 'false', '${new Date().toISOString()}', '${new Date().toISOString()}')
    RETURNING name
  `);

  return rows[0];
};

const updateTask = async ({ body, params }) => {
  const logger = httpContext.get('logger');
  const db = httpContext.get('dbPool');

  const { name, completed } = body;
  const { id } = params;

  if (!id) {
    throw new Error('task id is required field');
  }

  const valuesToUpdate = [];
  if (name) {
    valuesToUpdate.push(`name='${name}'`);
  }
  if (completed !== undefined) {
    valuesToUpdate.push(`completed='${completed}'`);
  }

  if(!valuesToUpdate.length){
    throw new Error('Nothing to update');
  }

  logger.info('updating task id:', id);

  const { rows } = await db.query(`
    UPDATE "tasks" SET ${valuesToUpdate.join()}
    WHERE id='${id}'
    RETURNING name, completed
  `);

  return rows[0];
};

const deleteTask = async ({ params }) => {
  const logger = httpContext.get('logger');
  const db = httpContext.get('dbPool');
  const { id } = params;

  logger.info('deleting task id:', id);

  const { rows } = await db.query(`
    DELETE FROM "tasks" 
    WHERE id='${id}'
    RETURNING name, completed
  `);

  return rows[0];
};

router.get('/', handler(getTasks));
router.post('/', handler(createTask));
router.put('/:id', handler(updateTask));
router.delete('/:id', handler(deleteTask));

module.exports = router;

