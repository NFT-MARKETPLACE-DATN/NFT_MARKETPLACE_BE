import { MigrationInterface, QueryRunner } from "typeorm";

export class NftMarketplace1719826170814 implements MigrationInterface {
    name = 'NftMarketplace1719826170814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`metadata_url\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`metadata_url\``);
    }

}
