import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gesoten NFT Gateway API Docs",
      version: "0.0.1",
      description: '<a href="http://localhost:3100/docs.json" target="_blank">View API definition in JSON</a><br><br>API Documentation with Swagger',
    },
    basePath: "/",
    host: "localhost:3300" ,//process.env.NODE_ENV === "development" ? "localhost:3300" : "#",
    consumes: ["application/json", "multipart/form-data"],
    produces: ["application/json", "multipart/form-data"],
    schemes: ["http"],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        }
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
        {
          url: 'http://localhost:3100/',
          description: 'Local server',
        },
        {
          url: '<your live url here>',
          description: 'Live server',
        },
      ],
    // 'x-callback-url': {
    //     url: '/api-docs.json',
    //     description: 'Link to JSON API definition',
    //   },
      
  },
  apis: ["./src/server.ts"
    // process.env.NODE_ENV === "development"
    //   ? "./src/server.ts"
    //   : "./dist/server.js",
  ],
};

export const swaggerSpec = swaggerJsdoc(options) as any;

export const swaggerDocs = (app: Express, port: number | string) => {
  // Swagger page
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  // app.get("/docs.json", (req: Request, res: Response) => {
  //   res.setHeader("Content-Type", "application/json");
  //   res.send(swaggerSpec);
  // });

  console.log(`Docs available at http://localhost:${port}/swagger`);
};
