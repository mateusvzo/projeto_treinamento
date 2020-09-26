import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Cursos from './Cursos';
import Funcionarios from './Funcionarios';

@Entity('treinamentos')
class Treinamentos {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    id_funcionario: string;

    @ManyToOne(() => Funcionarios)
    @JoinColumn({ name: 'id_funcionario' })
    funcionario_id: Funcionarios;

    @Column('uuid')
    id_curso: string;

    @ManyToOne(() => Cursos)
    @JoinColumn({ name: 'id_curso' })
    curso_id: Cursos;

    @Column()
    data_treinamento: Date;

    @Column()
    vencimento_treinamento: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Treinamentos;
