import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTable1694455735896 implements MigrationInterface {

  
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: 'name',
                    type: 'character varying',
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'character varying',
                    isNullable: false
                },
                {
                    name: 'password',
                    type: 'character varying',
                    isNullable: false
                }
            ]
        }))

        await queryRunner.createTable(new Table({
            name: 'tasks',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'title',
                    type: 'character varying'
                },
                {
                    name: 'status',
                    type: 'boolean'
                },
                {
                    name: 'userId',
                    type: 'uuid'
                }
            ]
        }))

        await queryRunner.createForeignKey(
            'tasks',
            new TableForeignKey({
                columnNames:['userId'],
                referencedColumnNames:['id'],
                referencedTableName: 'users'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tasks');
        await queryRunner.dropTable('users');

    }

}
