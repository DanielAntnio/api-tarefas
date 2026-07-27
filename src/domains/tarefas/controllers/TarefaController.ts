import type { Request, Response } from "express";
import { TarefaService } from "../services/TarefaService";
import {
  parseStringToBoolean,
  pickObject,
  trimObjectStrings,
} from "../../../helpers/utils";
import { BadRequestError } from "../../../helpers/api-erros";
import { Tarefa } from "../model/Tarefa";

interface ICreateBody extends Pick<Tarefa, "title" | "description"> {}
interface IUpdateBody extends Partial<Omit<Tarefa, "id">> {}

class TarefaController {
 async create(req: Request, res: Response) {
    const createParams = pickObject(req.body, [
      "title",
      "description",
    ]) as ICreateBody;

    trimObjectStrings(createParams);

    const service = new TarefaService();
    const tarefa = await service.create(createParams);

    return res.status(201).json(tarefa);
  }

  async list(req: Request, res: Response) {
    const service = new TarefaService();

    const completed = parseStringToBoolean(
      req.query.completed as string | undefined,
    );

    const tarefas = await service.list(completed);
    return res.status(200).json(tarefas);
  }

  async idExist(req: Request, res: Response) {
    const id = Number(req.params.id);

    const service = new TarefaService();
    await service.getById(id);

    return res.status(204);
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const service = new TarefaService();
    const tarefa = await service.getById(id);

    return res.status(200).json(tarefa);
  }

  async update(req: Request, res: Response) {
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
    const tarefa = await service.update({
      id,
      ...updateBody,
    });

    return res.status(200).json(tarefa);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    const service = new TarefaService();
    await service.delete(id);

    return res.status(204).json({ sucess: true });
  }
}

export { TarefaController };
