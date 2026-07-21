import express from "express";
import { tarefaRoutes } from "./routes/tarefa.routes";

const app = express();
const PORTA = 3333;

app.use(express.json());

app.use("/tarefas", tarefaRoutes);

app.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando na porta ${PORTA}`);
});
