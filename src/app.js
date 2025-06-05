// src/app.js
const express = require("express");
const app = express();
const taskRoutes = require("./routes/taskRoutes");

app.use(express.json());

// Middleware de log
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Rotas de tarefas
app.use("/tasks", taskRoutes);

// Rota de documentação
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

// Configuração do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
