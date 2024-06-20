import { MigrationInterface, QueryRunner } from "typeorm";

export class NftMarketplace1718852240464 implements MigrationInterface {
    name = 'NftMarketplace1718852240464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`transfers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_delete\` tinyint NOT NULL DEFAULT 0, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`tx_id\` varchar(255) NULL, \`action_tx\` varchar(255) NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`nfts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_delete\` tinyint NOT NULL DEFAULT 0, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nft_name\` varchar(255) NULL, \`image\` varchar(255) NULL, \`description\` text NULL, \`attribute\` varchar(255) NULL, \`mint_address\` varchar(255) NULL, \`token_account\` varchar(255) NULL, \`user_id\` int NULL, \`user_created\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`list_nft\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_delete\` tinyint NOT NULL DEFAULT 0, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`price\` tinyint NOT NULL DEFAULT 0, \`is_list\` tinyint NOT NULL DEFAULT 0, \`trending\` int NOT NULL DEFAULT 0, \`nft_id\` int NULL, UNIQUE INDEX \`REL_f8214e799c7085467174e484ad\` (\`nft_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`transfers\` ADD CONSTRAINT \`FK_ba27d1ebe999481ff98cfe51f6c\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD CONSTRAINT \`FK_0791c43ff2e8c875bff4bf52850\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nfts\` ADD CONSTRAINT \`FK_7a56fc700db05d3037d53e81566\` FOREIGN KEY (\`user_created\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`list_nft\` ADD CONSTRAINT \`FK_f8214e799c7085467174e484ada\` FOREIGN KEY (\`nft_id\`) REFERENCES \`nfts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`list_nft\` DROP FOREIGN KEY \`FK_f8214e799c7085467174e484ada\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP FOREIGN KEY \`FK_7a56fc700db05d3037d53e81566\``);
        await queryRunner.query(`ALTER TABLE \`nfts\` DROP FOREIGN KEY \`FK_0791c43ff2e8c875bff4bf52850\``);
        await queryRunner.query(`ALTER TABLE \`transfers\` DROP FOREIGN KEY \`FK_ba27d1ebe999481ff98cfe51f6c\``);
        await queryRunner.query(`DROP INDEX \`REL_f8214e799c7085467174e484ad\` ON \`list_nft\``);
        await queryRunner.query(`DROP TABLE \`list_nft\``);
        await queryRunner.query(`DROP TABLE \`nfts\``);
        await queryRunner.query(`DROP TABLE \`transfers\``);
    }

}
