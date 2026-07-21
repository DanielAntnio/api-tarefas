// src/domains/tarefas/controllers/TarefaController.ts
import type { Request, Response } from "express";
import { TarefaService } from "../services/TarefaService";


// Uma classe que "sabe" gerenciar requisições de Tarefas
class TarefaController {
  // Um método para gerenciar a rota de CRIAR
  create(req: Request, res: Response) {
    try {
      // 1. Pega os dados da requisição (trabalho de Gerente)
      const { nome, descricao } = req.body;

      // 2. Chama o "Trabalhador" (Service) para fazer a lógica
      const service = new TarefaService();
      const tarefa = service.create({ nome, descricao });

      // 3. Devolve a resposta (trabalho de Gerente)
      return res.status(201).json(tarefa);
    } catch (error: any) {
      // 4. Se o "Trabalhador" der um erro (ex: "Nome é obrigatório"),
      // o Gerente avisa o Cliente.
      return res.status(400).json({ erro: error.message });
    }
  }

  // Um método para gerenciar a rota de LISTAR
  list(req: Request, res: Response) {
    const service = new TarefaService();
    const tarefas = service.list();
    return res.status(200).json(tarefas);
  }
}

export { TarefaController };
