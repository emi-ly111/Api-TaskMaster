const express = require('express');
const app = express();
app.use(express.json());

let tasks = [
    {
        id: 1,
        title: "Estudar matemática",
        description: "Fazer exercícios de álgebra",
        completed: false
    },
    {
        id: 2,
        title: "Ler livro",
        description: "Ler capítulo 3 de 'O Senhor dos Anéis'",
        completed: true
    },
    {
        id: 3,
        title: "Fazer compras",
        description: "Comprar frutas e vegetais",
        completed: false
    }
];
let currentId = 4;

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