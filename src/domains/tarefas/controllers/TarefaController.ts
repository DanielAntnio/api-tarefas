import type { Request, Response } from "express";
import { TarefaService } from "../services/TarefaService";
import {
  pickObject,
  trimObjectStrings,
} from "../../../helpers/utils";
import { BadRequestError } from "../../../helpers/api-erros";
import { Tarefa } from "../model/Tarefa";

interface ICreateBody extends Pick<Tarefa, "title" | "description"> {}
interface IUpdateBody extends Partial<Omit<Tarefa, "id">> {}

class TarefaController {
  create(req: Request, res: Response) {
    const createParams = pickObject(req.body, [
      "title",
      "description",
    ]) as ICreateBody;

    trimObjectStrings(createParams);

    const service = new TarefaService();
    const tarefa = service.create(createParams);

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
    const updateBody = pickObject(req.body, [
      "title",
      "description",
      "completed",
    ]) as IUpdateBody;

    trimObjectStrings(updateBody);

    if (Object.keys(updateBody).length === 0)
      throw new BadRequestError(
        "Body deve ter ao menos um paramentro de Tarefa",
      );


    const service = new TarefaService();
    const tarefa = service.update({
      id,
      ...updateBody,
    });

    return res.status(200).json(tarefa);
  }

  delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    const service = new TarefaService();
    service.delete(id);

    return res.status(204).json({ sucess: true });
  }
}

export { TarefaController };
