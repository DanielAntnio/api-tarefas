// src/index.ts
import express from "express";
import { tarefaRoutes } from "./routes/tarefa.routes";

// 1. Importa o "Porteiro"
const app = express();
const PORTA = 3333;

app.use(express.json()); // O "Tradutor de JSON"

// 2. [A MÁGICA]
// Dizemos ao Express: "Qualquer requisição que comece
// com o caminho '/tarefas', mande para o 'Porteiro' (tarefaRoutes) cuidar."
app.use("/tarefas", tarefaRoutes);

// Se tivéssemos usuários:
// app.use('/usuarios', usuarioRoutes);

// 3. Liga o motor
app.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando na porta ${PORTA}`);
});
