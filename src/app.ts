import express from "express";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import api from "routers";

import logger from "utils/logger.util";

import loggerMiddleware from "middleware/logger.middleware";

import { errorHandlerMiddleware } from "middleware/error.middleware";

const app = express();

export const runServer = () => {
  // parse application/json
  app.use(express.json());

  // Data sanitization again NoSQL injection
  app.use(mongoSanitize());

  // Data sanitization again XSS
  app.use(xss());

  // middleware
  app.use(loggerMiddleware);

  //api
  app.use("/api", api);

  //error
  app.use(errorHandlerMiddleware);

  app.listen(process.env.SERVER_PORT, () => {
    logger.info(
      `✅ Server is running at http://localhost:${process.env.SERVER_PORT}`
    );
  });
};
