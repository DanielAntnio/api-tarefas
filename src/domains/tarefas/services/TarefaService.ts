// src/domains/tarefas/services/TarefaService.ts

import { Tarefa } from "../model/Tarefa";

// Na S7, guardamos em memória. Na S8, trocamos isso pelo Prisma.
const bancoDeDadosEmMemoria: Tarefa[] = [];

interface ICriarTarefa {
  title: string;
  description?: string;
}

// Uma classe que "sabe" fazer operações de Tarefas
class TarefaService {
  // Um método que sabe CRIAR uma tarefa
  create({ title, description }: ICriarTarefa) {
    // --- AQUI MORA A LÓGICA DE NEGÓCIO ---
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
    // -------------------------------------

    return novaTarefa;
  }

  // Um método que sabe LISTAR tarefas
  list() {
    return bancoDeDadosEmMemoria;
  }
}

export { TarefaService };
