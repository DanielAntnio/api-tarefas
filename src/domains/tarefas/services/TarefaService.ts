import { BadRequestError, NotfoundError } from "../../../helpers/api-erros";
import { Tarefa } from "../model/Tarefa";

const bancoDeDadosEmMemoria: Tarefa[] = [];

interface ICriarTarefa extends Pick<Tarefa, "title" | "description"> {}

interface IUpdateTarefa
  extends Pick<Tarefa, "id">, Omit<Partial<Tarefa>, "id"> {}

class TarefaService {
  create({ title, description }: ICriarTarefa) {
    if (!title.trim()) {
      throw new BadRequestError("Nome da tarefa é obrigatório");
    }

    const novaTarefa: Tarefa = {
      id: Math.random(),
      title,
      completed: false,
    };

    if (description?.trim()) novaTarefa.description = description;

    bancoDeDadosEmMemoria.push(novaTarefa);

    return novaTarefa;
  }

  list(completed?: boolean) {
    if (completed === undefined) return bancoDeDadosEmMemoria;

    return bancoDeDadosEmMemoria.filter(
      (tarefa) => tarefa.completed === completed,
    );
  }

  getById(id: number) {
    const tarefa = bancoDeDadosEmMemoria.find((tarefa) => tarefa.id === id);

    if (!tarefa) throw new NotfoundError("Tarefa não Encontrada");

    return tarefa;
  }

  update({ id, ...updateValues }: IUpdateTarefa) {
    const tarefa = this.getById(id);

    if (!tarefa) throw new NotfoundError("Tarefa não Encontrada");

    Object.assign(tarefa, updateValues);

    return tarefa;
  }

  delete(id: number) {
    const index = bancoDeDadosEmMemoria.findIndex((tarefa) => tarefa.id === id);

    if (index < 0) throw new NotfoundError("Tarefa não encontrada.");
  }
}

export { TarefaService };
