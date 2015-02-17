'use strict';

let app = require('../');
let level = require('level');
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
    it('should create the todo');
  });

  describe('PATCH /todos/:id', function() {
    it('should update the todo');
  });

  describe('DELETE /todos/:id', function() {
    it('should delete the todo');
  });
});
