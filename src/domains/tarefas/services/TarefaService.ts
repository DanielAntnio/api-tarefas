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
      throw new Error("Nome da tarefa é obrigatório");
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
    return bancoDeDadosEmMemoria.find((tarefa) => tarefa.id === id);
  }

  update({ id, title, description, completed }: IUpdateTarefa) {
    const tarefa = this.getById(id);

    if (!tarefa) return undefined;

    if (title && title !== tarefa.title) tarefa.title = title;

    if (description && description !== tarefa.description)
      tarefa.description = description;

    if (completed !== undefined && completed !== tarefa.completed)
      tarefa.completed = completed;

    return tarefa;
  }

  delete(id: number) {
    const index = bancoDeDadosEmMemoria.findIndex((tarefa) => tarefa.id === id);

    if (index < 0) return;

    return bancoDeDadosEmMemoria.splice(index, 1);
  }
}

export { TarefaService };
