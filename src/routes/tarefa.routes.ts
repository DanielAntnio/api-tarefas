import { Router } from "express";
import { TarefaController } from "../domains/tarefas/controllers/TarefaController";
import validateBody from "../middlewares/validation";

const tarefaRoutes = Router();
const controller = new TarefaController();

tarefaRoutes.get("/", controller.list);
tarefaRoutes.get("/:id", controller.getById);

tarefaRoutes.head("/:id", controller.idExist);

tarefaRoutes.post("/", validateBody, controller.create);

tarefaRoutes.put("/:id", validateBody, controller.update);

tarefaRoutes.delete("/:id", controller.delete);

export { tarefaRoutes };
