
/**
 * Module dependencies.
 */

var koa = require('koa');
var app = koa();

// TODO: add middleware here.
app.use(function* () {
  // ...
});

// More or less an alias for `http.createServer() + http.listen()`.
app.listen(3000, function() {
  console.log('Server running at http://localhost:3000');
});

