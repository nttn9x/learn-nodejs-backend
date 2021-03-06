import * as dotenv from "dotenv";
import mongoose from "mongoose";
import logger from "utils/logger.util";

import me from "./who-am-i";
import { runServer } from "./src/app";

logger.info("⛷ ⛱ ⛰ ⛳ Start app!!! ⛺ ⛹  ⛸ ⛷");

me.forEach((status: string) => {
  logger.info(`.. ${status}`);
});

dotenv.config({ path: __dirname + "/.env" });
logger.info("✅ Dotenv");

mongoose.connect(
  `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?authSource=admin`,
  {},
  function (err) {
    if (err) {
      logger.info("❌ DB connection unsuccessful!" + err);
      process.exit(1);
      return;
    }
    logger.info("✅ DB connection successful!");

    runServer();
  }
);
