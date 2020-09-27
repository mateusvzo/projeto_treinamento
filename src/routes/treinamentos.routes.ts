import { Router } from 'express';
import { getRepository } from 'typeorm';
import ListarController from '../app/controllers/ListarController';
import TreinamentosController from '../app/controllers/TreinamentosController';
import Treinamentos from '../app/models/Treinamentos';
import ensureAuthenticated from '../middleawares/ensureAuthenticated';

const treinamentosRouter = Router();
treinamentosRouter.use(ensureAuthenticated);

treinamentosRouter.post('/', async (request, response) => {
    const treinamentosController = new TreinamentosController();
    try {
        const { id_funcionario, id_curso, data_treinamento } = request.body;
        const treinamentos = await treinamentosController.store({
            id_funcionario,
            id_curso,
            data_treinamento,
        });
        return response.json(treinamentos);
    } catch (erro) {
        return response.status(400).json({ error: erro.message });
    }
});

treinamentosRouter.get('/', async (request, response) => {
    const treinamentosRepository = getRepository(Treinamentos);
    const treinamentos = await treinamentosRepository.find();

    return response.json(treinamentos);
});

treinamentosRouter.get('/:id', async (request, response) => {
    const treinamentosRepository = getRepository(Treinamentos);
    const { id } = request.params;
    const treinamentos = await treinamentosRepository.findOne(id);

    return response.json(treinamentos);
});

treinamentosRouter.put('/:id', async (request, response) => {
    const treinamentosRepository = getRepository(Treinamentos);
    const { id } = request.params;
    const { id_funcionario, id_curso, data_treinamento } = request.body;
    const treinamento = await treinamentosRepository.findOne(id);

    if (!treinamento) {
        throw new Error('Treinamento Inválido');
    }

    treinamento.id_funcionario = id_funcionario;
    treinamento.id_curso = id_curso;
    treinamento.data_treinamento = data_treinamento;

    await treinamentosRepository.save(treinamento);
    return response.json(treinamento);
});

treinamentosRouter.delete('/:id', async (request, response) => {
    const treinamentosRepository = getRepository(Treinamentos);
    const { id } = request.params;
    await treinamentosRepository.delete(id);

    return response.send();
});

treinamentosRouter.get('/listar/:id', async (request, response) => {
    const listarRepository = new ListarController();
    const { id } = request.params;
    const treinamento = await listarRepository.show({
        id,
    });

    return response.json(treinamento);
});

export default treinamentosRouter;
