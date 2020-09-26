import { Router } from 'express';
import { getRepository } from 'typeorm';
import AdminsController from '../app/controllers/AdminsController';
import Admins from '../app/models/Admins';

const adminsRouter = Router();

adminsRouter.post('/', async (request, response) => {
    const adminsController = new AdminsController();
    try {
        const { matricula, password } = request.body;
        const admin = await adminsController.store({
            matricula,
            password,
        });
        // delete admin.password; Esta dando erro

        return response.json(admin);
    } catch (erro) {
        return response.status(400).json({ error: erro.message });
    }
});

adminsRouter.get('/', async (request, response) => {
    const adminsRepository = getRepository(Admins);
    const admin = await adminsRepository.find();

    return response.json(admin);
});

adminsRouter.delete('/:id', async (request, response) => {
    const adminsRepository = getRepository(Admins);
    const { id } = request.params;
    await adminsRepository.delete(id);

    return response.send('Administrador Deletado');
});

export default adminsRouter;
