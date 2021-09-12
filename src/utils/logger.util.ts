import pino from "pino";
import fs from "fs";
import path from "path";
import { format } from "date-fns";

const nowStr = format(new Date(), "MM_dd_yyyy");
const fileName = path.join("src", "log", nowStr);

fs.writeFileSync(path.join("src", "log", nowStr), "");

const logger = pino(
  {
    prettyPrint: true,
    level: "trace",
  },
  pino.destination(fileName)
);

export default logger;
