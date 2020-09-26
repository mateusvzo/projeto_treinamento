import { Router } from 'express';

import funcionarioRouter from './funcionarios.routes';
import cursosRouter from './cursos.routes';
import adminsRouter from './admins.routes';
import adminsSessionsRouter from './adminsSessions.routes';
import treinamentosRouter from './treinamentos.routes';

const routes = Router();

routes.use('/funcionarios', funcionarioRouter);
routes.use('/cursos', cursosRouter);
routes.use('/admins', adminsRouter);
routes.use('/sessions', adminsSessionsRouter);
routes.use('/treinamentos', treinamentosRouter);

export default routes;
