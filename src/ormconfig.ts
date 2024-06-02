import { DataSource } from "typeorm"
import * as dotenv from 'dotenv';
import path = require("path");
dotenv.config();

const migrationsDirectory = path.resolve(__dirname, '..', 'migrations');
export const ormconfig = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_POST ?? '3306', 10),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    // host: "150.95.115.210",
    // port: 3306,
    // username: "dev_be",
    // password: "xYe&8#XxOlj19S",
    // database: "portfolio_internal_2",
    logging: false,
    synchronize: false,
    multipleStatements: true,
    entities: [
        __dirname + '/entities/**/*.entity{.ts,.js}',
      ],
    migrations: [migrationsDirectory + `/**/*.{js,ts}`],
    migrationsRun: true,
})