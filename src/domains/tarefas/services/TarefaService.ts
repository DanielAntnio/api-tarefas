import { Tarefa } from "../model/Tarefa";

const bancoDeDadosEmMemoria: Tarefa[] = [];

interface ICriarTarefa {
  title: string;
  description?: string;
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
}

export { TarefaService };
