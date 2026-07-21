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

  list() {
    return bancoDeDadosEmMemoria;
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
}

export { TarefaService };
