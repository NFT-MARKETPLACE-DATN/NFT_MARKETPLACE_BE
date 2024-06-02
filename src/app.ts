import express from "express";
import * as bodyParser from "body-parser";
import { ormconfig } from "./ormconfig"

import cookieParser from 'cookie-parser'
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger';
const path = require('path');

class App {
  public app: express.Application;

  constructor() {
    console.log(`Application starting`);
    this.app = express();
    this.config();
    this.setupSwagger();
  }

  private config(): void {
    console.log(`App start connect to database`);
    ormconfig
      .initialize()
      .then(() => {
        console.log("Data Source has been initialized!")
      })
      .catch((err : Error) => {
        console.error("Error during Data Source initialization:", err)
      })
      
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
  private setupSwagger(): void {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.app.get('/docs.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerSpec)
    })
  }
}

export default new App().app;