import { getRepository } from 'typeorm';
import Cursos from '../models/Cursos';
import Funcionarios from '../models/Funcionarios';
import Treinamentos from '../models/Treinamentos';

interface Request {
    id: string;
}

interface Response {
    id_funcionario: string;
    nome_funcionario: string;
    id_curso: string;
    nome_curso: string;
    data_treinamento: Date;
    vencimento_treinamento: Date;
}

class ListarController {
    public async show({ id }: Request): Promise<Response> {
        const funcionariosRepository = getRepository(Funcionarios);
        const cursosRepository = getRepository(Cursos);
        const treinamentosRepository = getRepository(Treinamentos);

        const treinamento = await treinamentosRepository.findOne({
            where: { id: id },
        });
        if (!treinamento) {
            throw new Error('Treinamento Invalido');
        }

        const funcionario = await funcionariosRepository.findOne({
            where: { id: treinamento.id_funcionario },
        });
        if (!funcionario) {
            throw new Error('Funcionario Invalido');
        }

        const curso = await cursosRepository.findOne({
            where: { id: treinamento.id_curso },
        });
        if (!curso) {
            throw new Error('Curso Invalido');
        }
        return {
            id_funcionario: funcionario.id,
            nome_funcionario: funcionario.nome,
            id_curso: curso.id,
            nome_curso: curso.nome,
            data_treinamento: treinamento.data_treinamento,
            vencimento_treinamento: treinamento.vencimento_treinamento,
        };
    }
}

export default ListarController;
