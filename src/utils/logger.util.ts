import pino from "pino";
import fs from "fs";
import path from "path";
import { format } from "date-fns";

let logger: any;
if (process.env.NODE_ENV === "development") {
  logger = pino({
    level: "trace",
    prettyPrint: true,
  });
} else {
  const nowStr = format(new Date(), "yyyy_dd_MM");
  const fileName = path.join("src", "log", nowStr);

  if (!fs.existsSync(path.join("src", "log"))) {
    fs.mkdirSync(path.join("src", "log"));
  }

  if (!fs.existsSync(fileName)) {
    fs.writeFileSync(fileName, "");
  }

  logger = pino(
    {
      prettyPrint: true,
    },
    pino.destination(fileName)
  );
}

export default logger;
