import { Router } from "express";
import { TarefaController } from "../domains/tarefas/controllers/TarefaController";
import validateBody from "../middlewares/validation";
import { taskKeysFiltered } from "../helpers/const";

const tarefaRoutes = Router();
const controller = new TarefaController();

tarefaRoutes.get("/", controller.list);
tarefaRoutes.get("/:id", controller.getById);

tarefaRoutes.head("/:id", controller.idExist);

tarefaRoutes.post(
  "/",
  validateBody({ title: true, description: false, completed: false }),
  controller.create,
);

tarefaRoutes.put("/:id", validateBody(), controller.update);

tarefaRoutes.delete("/:id", controller.delete);

export { tarefaRoutes };
