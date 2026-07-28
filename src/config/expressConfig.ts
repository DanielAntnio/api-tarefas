import express from "express";
import { tarefaRoutes } from "../routes/tarefa.routes";
import { ErrorHandler } from "../middlewares/error";
import { PrismaErrorHandler } from "../middlewares/prisma-error";

const app = express();
app.use(express.json());
app.use("/tarefas", tarefaRoutes);

app.use(PrismaErrorHandler)
app.use(ErrorHandler);

export { app };
