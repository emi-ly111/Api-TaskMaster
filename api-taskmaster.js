const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];
let currentId = 1;

// POST /tasks - CRIAR NOVA TAREFA
app.post('/tasks', (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: "Title is required" });
  }
  
  const task = {
    id: currentId++,
    title: req.body.title,
    description: req.body.description || "",
    completed: false
  };
  
  tasks.push(task);
  res.status(201).json(task);
});

// GET /tasks - LISTAR TODAS AS TAREFAS
app.get('/tasks', (req, res) => {
  if (req.query.completed) {
    const completed = req.query.completed === 'true';
    return res.json(tasks.filter(t => t.completed === completed));
  }
  res.json(tasks);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});