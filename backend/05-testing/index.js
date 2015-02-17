'use strict';

let _ = require('lodash');
let bodyParser = require('koa-bodyparser');
let cors = require('koa-cors');
let koa = require('koa');
let level = require('level');
let router = require('koa-router')();
let stringify = require('streaming-json-stringify');

// Instance variables.
let env = process.env.NODE_ENV || 'dev';
let db = require('level-promise')(level(`./db-${env}`, { encoding: 'json' }));

// Get list of todos.
router.get('/todos', function *() {
  let stream = db.createValueStream();

  this.body = stream.pipe(stringify());
  this.type = 'application/json';
});

// Create a todo.
router.post('/todos', function *() {
  let todo = this.request.body;

  yield db.put(todo.id, todo);

  this.body = todo;
});

// Update a todo.
router.patch('/todos/:id', function *() {
  let todo = yield db.get(this.params.id);

  todo = _.assign(todo, this.request.body, {
    id: this.params.id
  });

  yield db.put(this.params.id, todo);

  this.body = todo;
});

// Delete a todo.
router.delete('/todos/:id', function *() {
  yield db.del(this.params.id);

  this.status = 204;
});

// Bootstrap the Koa application.
let app = koa();

app
  .use(cors({ origin: '*', methods: ['DELETE', 'GET', 'PATCH', 'POST'] }))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app.listen(3000);
module.exports.db = db;
