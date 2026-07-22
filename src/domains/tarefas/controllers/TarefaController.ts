import type { Request, Response } from "express";
import { TarefaService } from "../services/TarefaService";

class TarefaController {
  create(req: Request, res: Response) {
    try {
      const { title, description } = req.body;

      const service = new TarefaService();
      const tarefa = service.create({ title, description });

      return res.status(201).json(tarefa);
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }

  list(req: Request, res: Response) {
    const service = new TarefaService();

    const { completed } = req.query;

    if (completed !== "true" && completed !== "false") {
      const tarefas = service.list();
      return res.status(200).json(tarefas);
    }

    const booleanLookup = { true: true, false: false };
    const completedBoolean = booleanLookup[completed];

    const tarefas = service.list(completedBoolean);
    return res.status(200).json(tarefas);
  }

  idExist(req: Request, res: Response) {
    const id = Number(req.params.id);

    const service = new TarefaService();
    const tarefa = service.getById(id);

    if (tarefa === undefined)
      return res.status(404);

    return res.status(200);
  }

  getById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const service = new TarefaService();
    const tarefa = service.getById(id);

    if (tarefa === undefined)
      return res.status(404).json({ erro: "Tarefa não encontrada." });

    return res.status(200).json(tarefa);
  }

  update(req: Request, res: Response) {
    const id = Number(req.params.id);

    const body = req.body;
    const service = new TarefaService();

    if (body === undefined)
      return res.status(400).json({ erro: "Deve fornecer body" });

    const { title, description, completed } = body;

    if (!title && !description && completed === undefined)
      return res.status(400).json({
        erro: "Body deve conter ao menos um dos campos de Tarefa a ser atualizado",
      });

    const tarefa = service.update({
      id,
      title,
      description,
      completed,
    });

    if (tarefa === undefined)
      return res.status(404).json({ erro: "Tarefa não encontrada." });

    return res.status(200).json(tarefa);
  }

  delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    const service = new TarefaService();
    const tarefas = service.delete(id);

    if (!tarefas === undefined)
      return res.status(404).json({ erro: "Tarefa não encontrada." });

    return res.status(204).json({ sucess: true });
  }
}

export { TarefaController };
