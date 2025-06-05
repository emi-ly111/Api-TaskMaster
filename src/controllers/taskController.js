// src/controllers/taskController.js
const { tasks, currentId } = require("../models/task");

// Funções de controle para cada rota
exports.getAllTasks = (req, res) => {
  if (req.query.completed) {
    const completed = req.query.completed === "true";
    const filteredTasks = tasks.filter((task) => task.completed === completed);
    return res.json(filteredTasks);
  }
  res.json(tasks);
};

exports.getTaskById = (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);
  if (!task) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }
  res.json(task);
};

exports.createTask = (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newTask = {
    id: currentId++,
    title: req.body.title,
    description: req.body.description || "",
    completed: req.body.completed || false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }
  if (req.body.title && typeof req.body.title !== "string") {
    return res.status(400).json({ error: "O título deve ser uma string" });
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
};

exports.deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const initialLength = tasks.length;
  const newTasks = tasks.filter((task) => task.id !== taskId);
  if (newTasks.length === initialLength) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }
  // Atualiza o array de tarefas
  tasks.length = 0;
  newTasks.forEach((t) => tasks.push(t));
  res.status(204).send();
};
