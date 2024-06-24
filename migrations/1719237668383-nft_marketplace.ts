import { MigrationInterface, QueryRunner } from "typeorm";

export class NftMarketplace1719237668383 implements MigrationInterface {
    name = 'NftMarketplace1719237668383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`list_nft\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_delete\` tinyint NOT NULL DEFAULT 0, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`price\` decimal(65,0) NOT NULL DEFAULT 0, \`is_list\` tinyint NOT NULL DEFAULT 0, \`is_trending\` tinyint NULL, \`nft_id\` int NULL, UNIQUE INDEX \`REL_f8214e799c7085467174e484ad\` (\`nft_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`nfts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_delete\` tinyint NOT NULL DEFAULT 0, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nft_name\` varchar(255) NOT NULL, \`symbol\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`description\` text NULL, \`attribute\` json NULL, \`mint_address\` varchar(255) NOT NULL, \`token_account\` varchar(255) NOT NULL, \`user_id\` int NULL, \`user_created\` int NULL, UNIQUE INDEX \`IDX_2aa9a27694e6bd4b391abe875a\` (\`mint_address\`, \`token_account\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_delete\` tinyint NOT NULL DEFAULT 0, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_name\` varchar(255) NULL, \`address\` varchar(255) NOT NULL, \`balance\` decimal(65,0) NULL, \`image\` varchar(255) NULL, \`background\` varchar(255) NULL, \`role_id\` int NOT NULL, UNIQUE INDEX \`IDX_b0ec0293d53a1385955f9834d5\` (\`address\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`acction_Type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transaction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_delete\` tinyint NOT NULL DEFAULT 0, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`tx_id\` varchar(255) NULL, \`user_id\` int NULL, \`action_type\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`list_nft\` ADD CONSTRAINT \`FK_f8214e799c7085467174e484ada\` FOREIGN KEY (\`nft_id\`) REFERENCES \`nfts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD CONSTRAINT \`FK_0791c43ff2e8c875bff4bf52850\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD CONSTRAINT \`FK_7a56fc700db05d3037d53e81566\` FOREIGN KEY (\`user_created\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_b4a3d92d5dde30f3ab5c34c5862\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_6196b7454efb4484af1e6594ac8\` FOREIGN KEY (\`action_type\`) REFERENCES \`acction_Type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_6196b7454efb4484af1e6594ac8\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_b4a3d92d5dde30f3ab5c34c5862\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP FOREIGN KEY \`FK_7a56fc700db05d3037d53e81566\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP FOREIGN KEY \`FK_0791c43ff2e8c875bff4bf52850\``);
        await queryRunner.query(`ALTER TABLE \`list_nft\` DROP FOREIGN KEY \`FK_f8214e799c7085467174e484ada\``);
        await queryRunner.query(`DROP TABLE \`transaction\``);
        await queryRunner.query(`DROP TABLE \`acction_Type\``);
        await queryRunner.query(`DROP INDEX \`IDX_b0ec0293d53a1385955f9834d5\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_2aa9a27694e6bd4b391abe875a\` ON \`nfts\``);
        await queryRunner.query(`DROP TABLE \`nfts\``);
        await queryRunner.query(`DROP INDEX \`REL_f8214e799c7085467174e484ad\` ON \`list_nft\``);
        await queryRunner.query(`DROP TABLE \`list_nft\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}
