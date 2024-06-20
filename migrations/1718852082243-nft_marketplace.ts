import { MigrationInterface, QueryRunner } from "typeorm";

export class NftMarketplace1718852082243 implements MigrationInterface {
    name = 'NftMarketplace1718852082243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`nfts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_delete\` tinyint NOT NULL DEFAULT 0, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`tx_id\` varchar(255) NULL, \`action_tx\` varchar(255) NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`tx_id\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`action_tx\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`tx_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`action_tx\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`nft_name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`image\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`attribute\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`mint_address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`token_account\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`user_created\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`price\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`is_list\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`trending\` int NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`nft_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD UNIQUE INDEX \`IDX_3ec990bdc42885e103ff528772\` (\`nft_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_3ec990bdc42885e103ff528772\` ON \`nfts\` (\`nft_id\`)`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD CONSTRAINT \`FK_0791c43ff2e8c875bff4bf52850\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD CONSTRAINT \`FK_7a56fc700db05d3037d53e81566\` FOREIGN KEY (\`user_created\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD CONSTRAINT \`FK_3ec990bdc42885e103ff5287726\` FOREIGN KEY (\`nft_id\`) REFERENCES \`nfts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP FOREIGN KEY \`FK_3ec990bdc42885e103ff5287726\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP FOREIGN KEY \`FK_7a56fc700db05d3037d53e81566\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP FOREIGN KEY \`FK_0791c43ff2e8c875bff4bf52850\``);
        await queryRunner.query(`DROP INDEX \`REL_3ec990bdc42885e103ff528772\` ON \`nfts\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP INDEX \`IDX_3ec990bdc42885e103ff528772\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`nft_id\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`trending\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`is_list\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`user_created\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`token_account\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`mint_address\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`attribute\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`image\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`nft_name\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`action_tx\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`tx_id\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`action_tx\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`tx_id\` varchar(255) NULL`);
        await queryRunner.query(`DROP TABLE \`nfts\``);
    }

}
