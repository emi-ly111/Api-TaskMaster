// src/models/task.js
// Modelo de dados para tarefas (simples, usando array em memória)

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

module.exports = {
  tasks,
  currentId,
};
