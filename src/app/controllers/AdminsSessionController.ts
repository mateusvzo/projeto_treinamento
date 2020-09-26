import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Admins from '../models/Admins';
import authConfig from '../../config/auth';

interface Request {
    matricula: number;
    password: string;
}

interface Response {
    admins: Admins;
    token: string;
}

class AdminsSessionController {
    public async store({ matricula, password }: Request): Promise<Response> {
        const adminsRepository = getRepository(Admins);
        const admins = await adminsRepository.findOne({
            where: { matricula },
        });

        if (!admins) {
            throw new Error('Combinação de matricula/senha Errada');
        }

        const verificarPassword = await compare(password, admins.password);

        if (!verificarPassword) {
            throw new Error('Combinação de matricula/senha Errada');
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: admins.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            admins,
            token,
        };
    }
}

export default AdminsSessionController;
