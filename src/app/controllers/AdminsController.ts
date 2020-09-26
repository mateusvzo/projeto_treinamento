import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Admins from '../models/Admins';

interface Request {
    matricula: number;
    password: string;
}

class AdminsController {
    public async store({ matricula, password }: Request): Promise<Admins> {
        const adminsRepository = getRepository(Admins);

        const adminsExist = await adminsRepository.find();

        if (adminsExist.length === 2) {
            throw new Error('Limite Atingido');
        }

        const adminsMatriculaExist = await adminsRepository.findOne({
            where: { matricula },
        });

        if (adminsMatriculaExist) {
            throw new Error('Matricula ja Existe');
        }

        const hashedPassword = await hash(password, 8);

        const admin = adminsRepository.create({
            matricula,
            password: hashedPassword,
        });

        await adminsRepository.save(admin);

        // delete admin.password; esta dando erro

        return admin;
    }
}

export default AdminsController;
