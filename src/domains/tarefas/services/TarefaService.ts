// src/domains/tarefas/services/TarefaService.ts

// Na S7, guardamos em memória. Na S8, trocamos isso pelo Prisma.
const bancoDeDadosEmMemoria: {
  id: number;
  nome: string;
  descricao: string;
  concluida: boolean;
}[] = [];

interface ICriarTarefa {
  nome: string;
  descricao: string;
}

// Uma classe que "sabe" fazer operações de Tarefas
class TarefaService {
  // Um método que sabe CRIAR uma tarefa
  create({ nome, descricao }: ICriarTarefa) {
    // --- AQUI MORA A LÓGICA DE NEGÓCIO ---
    if (!nome) {
      throw new Error("Nome da tarefa é obrigatório");
    }

    const novaTarefa = { id: Math.random(), nome, descricao, concluida: false };
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
