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
    const tarefas = service.list();
    return res.status(200).json(tarefas);
  }
}

export { TarefaController };
