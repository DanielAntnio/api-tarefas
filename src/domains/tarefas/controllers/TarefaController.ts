import type { Request, Response } from "express";
import { TarefaService } from "../services/TarefaService";
import { ApiError } from "../../../handlers/erros";

interface IUpdateBody {
  title?: string;
  description?: string;
  completed?: boolean;
}

function CopyObjectSubset<T, K extends keyof T>(
  source: Pick<T, (typeof keys)[number]>,
  dest: T,
  keys: K[],
) {
  keys.forEach((key) => {
    if (source[key] !== undefined) dest[key] = source[key];
  });
}

function getUpdateBody(body: Request["body"]): IUpdateBody {
  if (body === undefined) throw new ApiError("Deve fornecer body");

  const update: IUpdateBody = {};
  CopyObjectSubset(body, update, ["completed", "description", "title"]);

  if (Object.keys(update).length === 0)
    throw new ApiError("Body deve conter ao menos um paramentro de tarefa");

  return update;
}

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

    return res.status(204);
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
    const body = getUpdateBody(req.body);

    const service = new TarefaService();
    const tarefa = service.update({
      id,
      ...body,
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
