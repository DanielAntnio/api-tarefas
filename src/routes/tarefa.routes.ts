// src/routes/tarefa.routes.ts

import { Router } from 'express';
import { TarefaController } from '../domains/tarefas/controllers/TarefaController';

// Router() é um "mini-servidor" só para as rotas de tarefa
const tarefaRoutes = Router(); 
const controller = new TarefaController();

// "Porteiro, quando for POST em '/', chame o Gerente no método 'create'"
tarefaRoutes.post('/', controller.create);

// "Porteiro, quando for GET em '/', chame o Gerente no método 'list'"
tarefaRoutes.get('/', controller.list);
// ...e assim por diante para PUT, DELETE, etc.

export { tarefaRoutes };