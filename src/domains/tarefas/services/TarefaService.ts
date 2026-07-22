import { ApiError } from "../../../handlers/erros";
import { Tarefa } from "../model/Tarefa";

const bancoDeDadosEmMemoria: Tarefa[] = [];

interface ICriarTarefa {
  title: string;
  description?: string;
}

interface IUpdateTarefa {
  id: number;
  title?: string;
  description?: string;
  completed?: boolean;
}

class TarefaService {
  create({ title, description }: ICriarTarefa) {
    if (!title) {
      throw new ApiError("Nome da tarefa é obrigatório");
    }

    const novaTarefa: Tarefa = {
      id: Math.random(),
      title,
      completed: false,
    };

    if (description) novaTarefa.description = description;

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

    if (!tarefa) throw new ApiError("Tarefa não Encontrada", 404);

    return tarefa;
  }

  update({ id, ...updateValues }: IUpdateTarefa) {
    const tarefa = this.getById(id);

    if (!tarefa) throw new ApiError("Tarefa não Encontrada", 404);

    Object.assign(tarefa, updateValues);

    return tarefa;
  }

  delete(id: number) {
    const index = bancoDeDadosEmMemoria.findIndex((tarefa) => tarefa.id === id);

    if (index < 0) throw new ApiError("Tarefa não encontrada.", 404);

    return bancoDeDadosEmMemoria.splice(index, 1);
  }
}

export { TarefaService };
