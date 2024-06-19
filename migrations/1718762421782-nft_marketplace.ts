import { MigrationInterface, QueryRunner } from "typeorm";

export class NftMarketplace1718762421782 implements MigrationInterface {
    name = 'NftMarketplace1718762421782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_delete\` tinyint NOT NULL DEFAULT 0, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_name\` varchar(255) NULL, \`address\` varchar(255) NOT NULL, \`balance\` decimal(65,0) NULL, \`image\` varchar(255) NULL, \`background\` varchar(255) NULL, \`role_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`nfts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_delete\` tinyint NOT NULL DEFAULT 0, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nft_name\` varchar(255) NULL, \`image\` varchar(255) NULL, \`description\` text NULL, \`attribute\` varchar(255) NULL, \`mint_address\` varchar(255) NULL, \`token_account\` varchar(255) NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`nft_created\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_delete\` tinyint NOT NULL DEFAULT 0, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NULL, \`nft_id\` int NULL, UNIQUE INDEX \`REL_b3b3a68dc4f4b0a48fdbdbb4a6\` (\`nft_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`nft_name\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`image\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`attribute\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`mint_address\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`token_account\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`nft_name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`image\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`attribute\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`mint_address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`token_account\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`price\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`is_list\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`trending\` int NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`nft_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD UNIQUE INDEX \`IDX_3ec990bdc42885e103ff528772\` (\`nft_id\`)`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`tx_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`action_tx\` varchar(255) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_3ec990bdc42885e103ff528772\` ON \`nfts\` (\`nft_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD CONSTRAINT \`FK_0791c43ff2e8c875bff4bf52850\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD CONSTRAINT \`FK_3ec990bdc42885e103ff5287726\` FOREIGN KEY (\`nft_id\`) REFERENCES \`nfts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nft_created\` ADD CONSTRAINT \`FK_5c2fdaedced1a98da84504f51d8\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nft_created\` ADD CONSTRAINT \`FK_b3b3a68dc4f4b0a48fdbdbb4a6f\` FOREIGN KEY (\`nft_id\`) REFERENCES \`nfts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`nft_created\` DROP FOREIGN KEY \`FK_b3b3a68dc4f4b0a48fdbdbb4a6f\``);
        await queryRunner.query(`ALTER TABLE \`nft_created\` DROP FOREIGN KEY \`FK_5c2fdaedced1a98da84504f51d8\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP FOREIGN KEY \`FK_3ec990bdc42885e103ff5287726\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP FOREIGN KEY \`FK_0791c43ff2e8c875bff4bf52850\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``);
        await queryRunner.query(`DROP INDEX \`REL_3ec990bdc42885e103ff528772\` ON \`nfts\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`action_tx\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`tx_id\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP INDEX \`IDX_3ec990bdc42885e103ff528772\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`nft_id\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`trending\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`is_list\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`token_account\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`mint_address\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`attribute\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`image\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP COLUMN \`nft_name\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`token_account\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`mint_address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`attribute\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`image\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD \`nft_name\` varchar(255) NULL`);
        await queryRunner.query(`DROP INDEX \`REL_b3b3a68dc4f4b0a48fdbdbb4a6\` ON \`nft_created\``);
        await queryRunner.query(`DROP TABLE \`nft_created\``);
        await queryRunner.query(`DROP TABLE \`nfts\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}
