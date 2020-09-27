import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import FuncionariosController from '../app/controllers/FuncionariosController';
import Funcionarios from '../app/models/Funcionarios';
import AvatarController from '../app/controllers/AvatarController';
import ensureAuthenticated from '../middleawares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const funcionarioRouter = Router();
const upload = multer(uploadConfig);
funcionarioRouter.use(ensureAuthenticated);

funcionarioRouter.post('/', async (request, response) => {
    try {
        const { nome, email } = request.body;
        const funcionariosController = new FuncionariosController();

        const user = await funcionariosController.store({
            nome,
            email,
        });

        return response.json(user);
    } catch (erro) {
        return response.status(400).json({ error: erro.message });
    }
});

funcionarioRouter.get('/', async (request, response) => {
    const funcionariosRepository = getRepository(Funcionarios);
    const user = await funcionariosRepository.find();

    return response.json(user);
});

funcionarioRouter.get('/:id', async (request, response) => {
    const funcionarioRepository = getRepository(Funcionarios);
    const { id } = request.params;
    const user = await funcionarioRepository.findOne(id);

    return response.json(user);
});

funcionarioRouter.delete('/:id', async (request, response) => {
    const funcionariosRepository = getRepository(Funcionarios);
    const { id } = request.params;
    await funcionariosRepository.delete(id);

    return response.send();
});

funcionarioRouter.put('/:id', async (request, response) => {
    const funcionariosRepository = getRepository(Funcionarios);
    const { id } = request.params;
    const { nome, email } = request.body;
    const func = await funcionariosRepository.findOne(id);

    if (!func) {
        throw new Error('Funcionario Inválido');
    }

    func.nome = nome;
    func.email = email;

    await funcionariosRepository.save(func);
    return response.json(func);
});

funcionarioRouter.patch(
    '/avatar/:id',
    upload.single('avatar'),
    async (request, response) => {
        try {
            const avatarFuncionariosController = new AvatarController();
            const { id } = request.params;
            const func = await avatarFuncionariosController.update({
                id,
                avatar: request.file.filename,
            });
            return response.json(func);
        } catch (erro) {
            return response.status(400).json({ erro: erro.message });
        }
    },
);

export default funcionarioRouter;
