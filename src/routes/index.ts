import { Router } from 'express';

import funcionarioRouter from './funcionarios.routes';
import cursosRouter from './cursos.routes';
import adminsRouter from './admins.routes';

const routes = Router();

routes.use('/funcionarios', funcionarioRouter);
routes.use('/cursos', cursosRouter);
routes.use('/admins', adminsRouter);

export default routes;
