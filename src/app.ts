import express from "express";
import * as bodyParser from "body-parser";
// import { ormconfig } from "./ormconfig"

import cookieParser from 'cookie-parser'
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    console.log(`App start connect to database`);
    // ormconfig
    //   .initialize()
    //   .then(() => {
    //     console.log("Data Source has been initialized!")
    //   })
    //   .catch((err : Error) => {
    //     console.error("Error during Data Source initialization:", err)
    //   })

    // this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(compress());

    // secure apps by setting various HTTP headers
    this.app.use(helmet());

    // enable CORS - Cross Origin Resource Sharing
    this.app.use(cors());
  }
}

export default new App().app;