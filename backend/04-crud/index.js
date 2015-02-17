var bodyParser = require('koa-bodyparser');
var cors = require('koa-cors');
var koa = require('koa');
var level = require('level');
var router = require('koa-router')();
var stringify = require('streaming-json-stringify');

var app = koa();
var db = require('level-promise')(level('./db', { encoding: 'json'}));

router.get('/todos', function *() {
  var stream = db.createValueStream();

  this.body = stream.pipe(stringify());
  this.type = 'application/json';
});

router.post('/todos', function *() {
  // ...
});

router.patch('/todos', function *() {
  // ...
});

router.delete('/todos', function *() {
  // ...
});

app
  .use(cors({ origin: '*', methods: ['DELETE', 'GET', 'PATCH', 'POST'] }))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
