import express from "express";
import { tarefaRoutes } from "./routes/tarefa.routes";
import { ErrorHandler } from "./middlewares/error";

const app = express();
const PORTA = 3333;

app.use(express.json());

app.use("/tarefas", tarefaRoutes);
app.use(ErrorHandler);

app.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando na porta ${PORTA}`);
});
