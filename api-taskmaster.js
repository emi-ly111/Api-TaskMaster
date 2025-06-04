const express = require("express");
const app = express();
app.use(express.json());

let tasks = [
  {
    id: 1,
    title: "Estudar matemática",
    description: "Fazer exercícios de álgebra",
    completed: false,
  },
  {
    id: 2,
    title: "Ler livro",
    description: "Ler capítulo 3 de 'O Senhor dos Anéis'",
    completed: true,
  },
  {
    id: 3,
    title: "Fazer compras",
    description: "Comprar frutas e vegetais",
    completed: false,
  },
];
let currentId = 4;

//MIDDLEWARE PARA LOG DE REQUISIÇOES
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// POST /tasks - CRIAR NOVA TAREFA
app.post("/tasks", (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({
      error: "Title is required",
    });
  }

  const newTask = {
    id: currentId++,
    title: req.body.title,
    description: req.body.description || "",
    completed: req.body.completed || false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// GET /tasks - LISTAR TODAS AS TAREFAS
app.get("/tasks", (req, res) => {
  //FILTRO POR STATUS DE CONCLUSAO
  if (req.query.completed) {
    const completed = req.query.completed === "true";
    const filteredTasks = tasks.filter((task) => task.completed === completed);
    return res.json(filteredTasks);
  }

  //RETORNA TODAS AS TAREFAS SE NAO HOUVER FILTRO
  res.json(tasks);
});

//ROTA GET /tasks/:id - BUSCAR TAREFA POR ID
app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({
      error: "Tarefa não encontrada",
    });
  }

  res.json(task);
});

//ROTA PUT /tasks/:id - ATUALIZAR TAREFA POR ID
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      error: "Tarefa não encontrada",
    });
  }

  if (req.body.title && typeof req.body.title !== "string") {
    return res.status(400).json({
      error: "O título deve ser uma string",
    });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    title: req.body.title || tasks[taskIndex].title,
    description: req.body.description || tasks[taskIndex].description,
    completed:
      req.body.completed !== undefined
        ? req.body.completed
        : tasks[taskIndex].completed,
  };

  tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
});

// ROTA DELETE /tasks/:id - DELETAR TAREFA POR ID
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const initialLength = tasks.length;

  tasks = tasks.filter((task) => task.id !== taskId);

  if (tasks.length === initialLength) {
    return res.status(404).json({
      error: "Tarefa não encontrada",
    });
  }

  // SE A TAREFA FOR DELETADA COM SUCESSO, RETORNA 204
  res.status(204).send();
});

// ROTA GET / - DOCUMENTAÇAO DA API
app.get("/", (req, res) => {
  res.json({
    message: "Bem-vindo à API TaskMaster",
    endpoints: {
      getAllTasks: "GET /tasks",
      createTask: "POST /tasks",
      getTask: "GET /tasks/:id",
      updateTask: "PUT /tasks/:id",
      deleteTask: "DELETE /tasks/:id",
    },
  });
});

//CONFIGURAÇÃO DO SERVIDOR
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
