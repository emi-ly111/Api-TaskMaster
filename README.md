# 📌 API TaskMaster - Lista de Tarefas

Uma API REST simples para gerenciamento de tarefas (to-do list), desenvolvida em Node.js com Express para trabalho acadêmico de Teste de Software, na Universidade Católica de Brasília.

## ✨ Funcionalidades

- **CRUD completo** de tarefas (Create, Read, Update, Delete)
- Filtros por status (`completed`) e busca por texto (`search`)
- Validações de dados e tratamento de erros
- Banco de dados em memória (simples para fins didáticos)

## 🛠️ Tecnologias

- **JavaScript** (Node.js)
- **Express** (Framework web)
- **Postman** (Para testes)

## 📚 Endpoints

| Método | Endpoint       | Descrição                      |
|--------|---------------|-------------------------------|
| POST   | /tasks        | Cria nova tarefa              |
| GET    | /tasks        | Lista todas as tarefas        |
| GET    | /tasks/:id    | Obtém uma tarefa específica   |
| PUT    | /tasks/:id    | Atualiza uma tarefa           |
| DELETE | /tasks/:id    | Remove uma tarefa             |

## 🚀 Como executar

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
3. Inicie o servidor:
    ```bash
    node .\api-taskmaster.js
4. Acesse `http://localhost:3000`