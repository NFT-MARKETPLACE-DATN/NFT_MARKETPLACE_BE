import { MigrationInterface, QueryRunner } from "typeorm";

export class NftMarketplace1719453426329 implements MigrationInterface {
    name = 'NftMarketplace1719453426329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`list_nft\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_delete\` tinyint NOT NULL DEFAULT 0, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`price\` decimal(65,0) NOT NULL DEFAULT 0, \`is_list\` tinyint NOT NULL DEFAULT 0, \`is_trending\` tinyint NULL, \`nft_id\` int NULL, UNIQUE INDEX \`REL_f8214e799c7085467174e484ad\` (\`nft_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`nfts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_delete\` tinyint NOT NULL DEFAULT 0, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nft_name\` varchar(255) NOT NULL, \`symbol\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`description\` text NULL, \`attribute\` json NULL, \`mint_address\` varchar(255) NOT NULL, \`token_account\` varchar(255) NOT NULL, \`user_id\` int NULL, \`user_created\` int NULL, UNIQUE INDEX \`IDX_2aa9a27694e6bd4b391abe875a\` (\`mint_address\`, \`token_account\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_delete\` tinyint NOT NULL DEFAULT 0, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_name\` varchar(255) NULL, \`address\` varchar(255) NOT NULL, \`balance\` decimal(65,0) NULL, \`image\` varchar(255) NULL, \`background\` varchar(255) NULL, \`role_id\` int NOT NULL, UNIQUE INDEX \`IDX_b0ec0293d53a1385955f9834d5\` (\`address\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`acction_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transfers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_delete\` tinyint NOT NULL DEFAULT 0, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`tx_id\` varchar(255) NULL, \`user_id\` int NULL, \`action_type\` int NULL, \`nft_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`list_nft\` ADD CONSTRAINT \`FK_f8214e799c7085467174e484ada\` FOREIGN KEY (\`nft_id\`) REFERENCES \`nfts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD CONSTRAINT \`FK_0791c43ff2e8c875bff4bf52850\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD CONSTRAINT \`FK_7a56fc700db05d3037d53e81566\` FOREIGN KEY (\`user_created\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transfers\` ADD CONSTRAINT \`FK_ba27d1ebe999481ff98cfe51f6c\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transfers\` ADD CONSTRAINT \`FK_72a40ee7d00a355ae7d5897b2da\` FOREIGN KEY (\`action_type\`) REFERENCES \`acction_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transfers\` ADD CONSTRAINT \`FK_c8b4b5fbcf559b26bb14057c5e1\` FOREIGN KEY (\`nft_id\`) REFERENCES \`nfts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transfers\` DROP FOREIGN KEY \`FK_c8b4b5fbcf559b26bb14057c5e1\``);
        await queryRunner.query(`ALTER TABLE \`transfers\` DROP FOREIGN KEY \`FK_72a40ee7d00a355ae7d5897b2da\``);
        await queryRunner.query(`ALTER TABLE \`transfers\` DROP FOREIGN KEY \`FK_ba27d1ebe999481ff98cfe51f6c\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP FOREIGN KEY \`FK_7a56fc700db05d3037d53e81566\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP FOREIGN KEY \`FK_0791c43ff2e8c875bff4bf52850\``);
        await queryRunner.query(`ALTER TABLE \`list_nft\` DROP FOREIGN KEY \`FK_f8214e799c7085467174e484ada\``);
        await queryRunner.query(`DROP TABLE \`transfers\``);
        await queryRunner.query(`DROP TABLE \`acction_type\``);
        await queryRunner.query(`DROP INDEX \`IDX_b0ec0293d53a1385955f9834d5\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_2aa9a27694e6bd4b391abe875a\` ON \`nfts\``);
        await queryRunner.query(`DROP TABLE \`nfts\``);
        await queryRunner.query(`DROP INDEX \`REL_f8214e799c7085467174e484ad\` ON \`list_nft\``);
        await queryRunner.query(`DROP TABLE \`list_nft\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}
