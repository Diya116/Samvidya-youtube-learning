import express from "express";

import { env } from "./config/env";
import config from "./config/server";

const app: express.Application = express();

config(app);

app.listen(env.port, () => {
  if (process.env.NODE_ENV != "production") {
    console.log(`Server started at: http://localhost:${env.port}`);
  }
});

export default app;