import { Router } from 'express';
import { getRepository } from 'typeorm';
import CursosController from '../app/controllers/CursosController';
import Cursos from '../app/models/Cursos';

const cursosRouter = Router();

cursosRouter.post('/', async (request, response) => {
    try {
        const { nome, carga_horaria_curso } = request.body;
        const cursosController = new CursosController();

        const user = await cursosController.store({
            nome,
            carga_horaria_curso,
        });
        return response.json(user);
    } catch (erro) {
        return response.status(400).json({ error: erro.message });
    }
});

cursosRouter.get('/', async (request, response) => {
    const cursosRepository = getRepository(Cursos);
    const user = await cursosRepository.find();

    return response.json(user);
});

cursosRouter.get('/:id', async (request, response) => {
    const cursosRepository = getRepository(Cursos);
    const { id } = request.params;
    const user = await cursosRepository.findOne(id);

    return response.json(user);
});

cursosRouter.delete('/:id', async (request, response) => {
    const cursosRepository = getRepository(Cursos);
    const { id } = request.params;
    await cursosRepository.delete(id);

    return response.send();
});

cursosRouter.put('/:id', async (request, response) => {
    const cursosRepository = getRepository(Cursos);
    const { id } = request.params;
    const { nome, carga_horaria_curso } = request.body;

    const curso = await cursosRepository.findOne(id);
    console.log(curso);

    if (!curso) {
        throw new Error('Curso Inexistente');
    }

    curso.nome = nome;
    curso.carga_horaria_curso = carga_horaria_curso;

    await cursosRepository.save(curso);
    return response.json(curso);
});

export default cursosRouter;
