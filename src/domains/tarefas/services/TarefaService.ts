import { prisma } from "../../../config/prismaClient";
import { NotfoundError } from "../../../helpers/api-erros";
import { Tarefa } from "../model/Tarefa";

interface ICriarTarefa extends Pick<Tarefa, "title" | "description"> {}

interface IUpdateTarefa
  extends Pick<Tarefa, "id">, Omit<Partial<Tarefa>, "id"> {}

class TarefaService {
  async create({ title, description }: ICriarTarefa) {
    const novaTarefa = await prisma.task.create({
      data: {
        title,
        description,
      },
    });

    return novaTarefa;
  }

  async list(completed?: boolean) {
    const tarefas = await prisma.task.findMany({
      where: {
        completed,
      },
    });

    return tarefas;
  }

  async getById(id: number) {
    const tarefa = await prisma.task.findUnique({ where: { id } });

    if (!tarefa) throw new NotfoundError("Tarefa não Encontrada");

    return tarefa;
  }

  async update({ id, ...updateValues }: IUpdateTarefa) {
    const tarefa = await prisma.task.update({
      where: { id },
      data: updateValues,
    });

    return tarefa;
  }

  async delete(id: number) {
    await prisma.task.delete({ where: { id } });
  }
}

export { TarefaService };
