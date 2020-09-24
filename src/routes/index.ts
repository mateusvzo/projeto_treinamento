import { Router } from 'express';

import funcionarioRouter from './funcionarios.routes';
import cursosRouter from './cursos.routes';

const routes = Router();

routes.use('/funcionarios', funcionarioRouter);
routes.use('/cursos', cursosRouter);

export default routes;
