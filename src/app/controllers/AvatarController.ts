import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Funcionarios from '../models/Funcionarios';
import uploadConfig from '../../config/upload';

interface Request {
    id: string;
    avatar: string;
}

class AvatarController {
    public async update({ id, avatar }: Request): Promise<Funcionarios> {
        const funcionariosRepository = getRepository(Funcionarios);

        const func = await funcionariosRepository.findOne({
            where: { id },
        });

        if (!func) {
            throw new Error('Funcionario Inexistente');
        }

        if (func.avatar) {
            const funcionarioAvatarPath = path.join(
                uploadConfig.directory,
                func.avatar,
            );
            const funcAvatarFileExists = await fs.promises.stat(
                funcionarioAvatarPath,
            );
            if (funcAvatarFileExists) {
                await fs.promises.unlink(funcionarioAvatarPath);
            }
        }
        func.avatar = avatar;

        await funcionariosRepository.save(func);

        return func;
    }
}

export default AvatarController;
