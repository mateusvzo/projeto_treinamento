import { getRepository } from 'typeorm';
import Funcionarios from '../models/Funcionarios';

interface Request {
    nome: string;
    email: string;
}

class FuncionariosController {
    public async store({ nome, email }: Request): Promise<Funcionarios> {
        const funcionariosRepository = getRepository(Funcionarios);

        const verificaFuncionario = await funcionariosRepository.findOne({
            where: { email },
        });

        if (verificaFuncionario) {
            throw new Error('Endereço de email já cadastrado');
        }

        const user = funcionariosRepository.create({
            nome,
            email,
        });

        await funcionariosRepository.save(user);

        return user;
    }
}

export default FuncionariosController;
