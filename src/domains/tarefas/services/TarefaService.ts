import { Prisma } from "../../../../generated/prisma/client";
import { prisma } from "../../../config/prismaClient";

class TarefaService {
  async create(data: Prisma.TaskCreateInput) {
    const novaTarefa = await prisma.task.create({ data });

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

  async update({ id, ...data }: { id: number } & Prisma.TaskUpdateInput) {
    const tarefa = await prisma.task.update({
      where: { id },
      data,
    });

    return tarefa;
  }

  async delete(id: number) {
    await prisma.task.delete({ where: { id } });
  }
}

export { TarefaService };
