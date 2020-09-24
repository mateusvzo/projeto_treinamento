import { getRepository } from 'typeorm';
import Cursos from '../models/Cursos';

interface Request {
    nome: string;
    carga_horaria_curso: number;
}

class CursosController {
    public async store({
        nome,
        carga_horaria_curso,
    }: Request): Promise<Cursos> {
        const cursosRepository = getRepository(Cursos);

        const verificaCurso = await cursosRepository.findOne({
            where: { nome },
        });

        if (verificaCurso) {
            throw new Error('Curso ja cadastrado');
        }

        const user = cursosRepository.create({
            nome,
            carga_horaria_curso,
        });

        await cursosRepository.save(user);

        return user;
    }
}

export default CursosController;
