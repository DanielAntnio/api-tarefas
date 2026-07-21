import { Router } from "express";
import { TarefaController } from "../domains/tarefas/controllers/TarefaController";

const tarefaRoutes = Router();
const controller = new TarefaController();

tarefaRoutes.get("/", controller.list);
tarefaRoutes.get("/:id", controller.getById);

tarefaRoutes.post("/", controller.create);

tarefaRoutes.put("/:id", controller.update)

tarefaRoutes.delete("/:id", controller.delete)

export { tarefaRoutes };
