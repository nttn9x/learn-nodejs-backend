import pino from "pino";

const logger = pino({
  prettyPrint: true,
  level: "trace",
});

export default logger;
