import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export default class CadastroTreinamento1600981495932
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'treinamentos',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'id_funcionario',
                        type: 'uuid',
                    },
                    {
                        name: 'id_curso',
                        type: 'uuid',
                    },
                    {
                        name: 'data_treinamento',
                        type: 'timestamp with time zone',
                    },
                    {
                        name: 'vencimento_treinamento',
                        type: 'timestamp with time zone',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'treinamentos',
            new TableForeignKey({
                columnNames: ['id_funcionario'],
                referencedTableName: 'funcionarios',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'treinamentos',
            new TableForeignKey({
                columnNames: ['id_curso'],
                referencedTableName: 'cursos',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('treinamentos');
    }
}
