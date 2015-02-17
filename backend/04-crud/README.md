# 03. CRUD Endpoints

1. Let's set up a few more endpoints this time:

  * List todos.
  * Add a todo.
  * Update a todo.
  * Delete a todo.

2. Run the example

  * npm install
  * npm start

3. Try managing your todos.

List todos:

```bash
❯ curl -X GET http://localhost:3000/todos
```

Add a todo:

```bash
❯ curl -X POST http://localhost:3000/todos -H 'content-type: application/json' -d '{ "id": 1, "title": "Foobar", "completed": false }'
```

Update a todo:

```bash
❯ curl -X PATCH http://localhost:3000/todos/1 -H 'content-type: application/json' -d '{ "completed": true }'
```

Delete a todo:

```bash
❯ curl -X DELETE http://localhost:3000/todos/1
```
