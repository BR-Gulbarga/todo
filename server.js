const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory store for todos
let todos = [];

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'Text is required' });
  }
  const newTodo = { id: todos.length + 1, text, done: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Mark a todo as done
app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  const todo = todos.find(todo => todo.id == id);
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  todo.done = done;
  res.json(todo);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id != id);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
