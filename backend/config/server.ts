import express, { NextFunction, Request, Response } from "express";
//enables gzip compression for the response body
import compression from "compression";
//parse incoming body (json or url-encoded)
import bodyParser from "body-parser";
//http request logger
import morgan from "morgan";
//sets http headers for security
import helmet from "helmet";
//allows cross-origin resource sharing 
import CookieParser from "cookie-parser"
import cors from "cors";
import {setupSwagger} from "../swagger"
import routes from "../src/routes/index.routes";
import { env } from "./env";
import logger from "../src/lib/logger";
const api = "/api/v1";

export default (app: express.Application) => {
  process.on("uncaughtException", async (error) => {
    console.log(error);
  });
//catches error that weren't caught anywhere in the app
  process.on("unhandledRejection", async (ex) => {
    console.log(ex);
  });
//handle rejected promises aren't handled yet

  app.enable("trust proxy");
  app.use(
    cors({
      allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
      credentials: true, // Allow credentials (cookies, authorization headers)
      exposedHeaders: ["Authorization", "X-Total-Count"], // Exposed headers to client
      methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
      optionsSuccessStatus: 200, // Successful OPTIONS response status
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g., mobile apps, curl) or if origin is in env.clients
        if (!origin || env.clients.includes(origin)) {
          callback(null, true);
        } else {
          logger.warn("CORS origin not allowed", { origin });
          callback(new Error("Not allowed by CORS"));
        }
      }, // Allowed origins
      preflightContinue: false, // Let Express handle preflight
    }),
  );

  // THIS IS THE CODE FOR SESSION (express-session) BASED AUTHENTICAION USING PRISMA ORM
  // app.use(
  //   session({
  //     store: sessionStore,        // Use custom session store (Prisma)
  //     secret: process.env.SESSION_SECRET, // Secret key used for signing session ID cookie
  //     resave: false, // Don't save the session if it was never modified
  //     saveUninitialized: false, // Don't save a session that is uninitialized
  //     cookie: {
  //       httpOnly: true, // Makes the cookie inaccessible to JavaScript (helps prevent XSS attacks)
  //       secure: process.env.NODE_ENV === "production", // Set to `true` for HTTPS in production
  //       sameSite: "strict", // Helps prevent CSRF attacks (allow only same-site requests)
  //       maxAge: 3600000, // Cookie expiration (1 hour)
  //       path: "/", // Path for which the cookie is valid
  //     },
  //     rolling: true, // Reset the expiration time of the session cookie on each request
  //   })
  // );

  app.use(
    bodyParser.urlencoded({
      extended: true, // Use the extended query string parser (allows rich objects and arrays)
      limit: "5mb", // Limit URL-encoded body size to 5MB
      type: "application/x-www-form-urlencoded", // Ensures that only URL-encoded content type is accepted
    }),
  );

  app.use(
    bodyParser.json({
      limit: "10mb", // Limit JSON body size to 10MB
      strict: true, // Enable strict mode (only accepts JSON, not JavaScript)
      type: "application/json", // Ensures that only application/json content type is accepted
    }),
  );

  app.use(morgan("dev"));
  app.use(helmet());
  app.use(compression());
  app.use(express.static("public"));
  app.use(CookieParser());
  app.disable("x-powered-by");
  // app.disable("etag");
  app.use(api, routes);
setupSwagger(app)
  app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({
      message: "samvidya : a platform for structured you tube learning",
    });
  });

  app.use((req: Request, res: Response, next: NextFunction): void => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Content-Security-Policy-Report-Only", "default-src: https:");
    
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT POST PATCH DELETE GET");
      res.status(200).json({});
      return; // Explicit return to end function
    }
  
    next();
  });
  

  app.use((_req: Request, _res: Response, next: NextFunction) => {
    const error: Error = new Error("Endpoint could not find!");
    next(error);
  });

  app.use((error: any, _req: Request, res: Response, _next: NextFunction): void => {
    if (error?.type === "entity.too.large") {
      // Handles request body size limit exceeded
      res.status(413).json({ error: "Request body is too large" });
      return;
    }
  
    const statusCode = error?.status ?? 500;
    const message = error?.message ?? "Internal Server Error";
  
    res.status(statusCode).json({ error: message });
  });
  
};