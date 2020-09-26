import { getRepository } from 'typeorm';
import { startOfHour, parseISO, addHours } from 'date-fns';
import Cursos from '../models/Cursos';
import Funcionarios from '../models/Funcionarios';
import Treinamentos from '../models/Treinamentos';

interface Request {
    id_funcionario: string;
    id_curso: string;
    data_treinamento: string;
}

class TreinamentosController {
    public async store({
        id_funcionario,
        id_curso,
        data_treinamento,
    }: Request): Promise<Treinamentos> {
        const funcionariosRepository = getRepository(Funcionarios);
        const cursosRepository = getRepository(Cursos);
        const treinamentosRepository = getRepository(Treinamentos);

        const funcionarios = await funcionariosRepository.findOne({
            where: { id: id_funcionario },
        });

        if (!funcionarios) {
            throw new Error('Funcionario Invalido');
        }

        const cursos = await cursosRepository.findOne({
            where: { id: id_curso },
        });

        if (!cursos) {
            throw new Error('Cursos Invalido');
        }

        const datatreinamento = startOfHour(parseISO(data_treinamento));
        const vencimentotreinamento = addHours(
            datatreinamento,
            cursos.carga_horaria_curso,
        );

        const treinamento = treinamentosRepository.create({
            id_funcionario,
            id_curso,
            data_treinamento: datatreinamento,
            vencimento_treinamento: vencimentotreinamento,
        });

        await treinamentosRepository.save(treinamento);

        return treinamento;
    }
}

export default TreinamentosController;
