'use strict';

let app = require('../');
let request = require('co-supertest');

describe('TodoMVC API', function() {
  describe('GET /todos', function() {
    it('should return a list of todos', function *() {
      yield app.db.put(1, { id: 1, title: 'Foobar', completed: false });

      yield request(app)
        .get('/todos')
        .expect(200)
        .expect([{ id: 1, title: 'Foobar', completed: false }])
        .end();
    });
  });

  describe('POST /todos', function() {
    it('should create the todo', function *() {
      yield request(app)
        .post('/todos')
        .send({ id: 1, title: 'Foobar', completed: false })
        .expect(200)
        .expect({ id: 1, title: 'Foobar', completed: false })
        .end();
    });
  });

  describe('PATCH /todos/:id', function() {
    it('should update the todo', function *() {
      yield app.db.put(1, { id: 1, title: 'Foobar', completed: false });

      yield request(app)
        .patch('/todos/1')
        .send({ completed: true })
        .expect(200)
        .expect({ id: 1, title: 'Foobar', completed: true })
        .end();
    });
  });

  describe('DELETE /todos/:id', function() {
    it('should delete the todo', function *() {
      yield app.db.put(1, { id: 1, title: 'Foobar', completed: false });

      yield request(app)
        .delete('/todos/1')
        .expect(204)
        .end();
    });
  });
});
