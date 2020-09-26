import { Router } from 'express';
import AdminsSessionController from '../app/controllers/AdminsSessionController';

const adminsSessionsRouter = Router();

adminsSessionsRouter.post('/', async (request, response) => {
    const adminsSessionController = new AdminsSessionController();
    try {
        const { matricula, password } = request.body;
        const { admins, token } = await adminsSessionController.store({
            matricula,
            password,
        });

        return response.json({ admins, token });
    } catch (erro) {
        return response.status(400).json({ error: erro.message });
    }
});

export default adminsSessionsRouter;
