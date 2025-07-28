import express from "express";
import { env } from "./config/env";
import config from "./config/server";
import { setupSwagger } from "./swagger"; 

const app: express.Application = express();

config(app);          
setupSwagger(app);    

app.listen(env.port, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`Server started at http://localhost:${env.port}`);
    console.log(`Swagger docs at http://localhost:${env.port}/api-docs`);
  }
});

export default app;
  