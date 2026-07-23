import type { Request, Response } from "express";
import { TarefaService } from "../services/TarefaService";
import { BadRequestError } from "../../../helpers/api-erros";
import { Tarefa } from "../model/Tarefa";

interface IUpdateBody extends Partial<Omit<Tarefa, "id">> {}

function CopyObjectSubset<T, K extends keyof T>(
  source: Pick<T, (typeof keys)[number]>,
  dest: T,
  keys: K[],
) {
  keys.forEach((key) => {
    if (
      source[key] !== undefined &&
      (typeof source[key] !== "string" || source[key].trim())
    )
      dest[key] = source[key];
  });
}

function getUpdateBody(body: Request["body"]): IUpdateBody {
  if (body === undefined) throw new BadRequestError("Deve fornecer body");

  const update: IUpdateBody = {};
  CopyObjectSubset(body, update, ["completed", "description", "title"]);

  if (Object.keys(update).length === 0)
    throw new BadRequestError(
      "Body deve conter ao menos um paramentro de tarefa",
    );

  return update;
}

class TarefaController {
  create(req: Request, res: Response) {
    if (req.body === undefined) throw new BadRequestError("Deve fornecer body");
    const { title, description } = req.body;

    const service = new TarefaService();
    const tarefa = service.create({ title, description });

    return res.status(201).json(tarefa);
  }

  list(req: Request, res: Response) {
    const service = new TarefaService();

    const { completed } = req.query;

    if (completed !== "true" && completed !== "false") {
      const tarefas = service.list();
      return res.status(200).json(tarefas);
    }

    const tarefas = service.list(completed === "true");
    return res.status(200).json(tarefas);
  }

  idExist(req: Request, res: Response) {
    const id = Number(req.params.id);

    const service = new TarefaService();
    service.getById(id);

    return res.status(204);
  }

  getById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const service = new TarefaService();
    const tarefa = service.getById(id);

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

    return res.status(200).json(tarefa);
  }

  delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    const service = new TarefaService();
    service.delete(id);

    return res.status(204);
  }
}

export { TarefaController };
