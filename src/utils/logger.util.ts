import pino from "pino";
import fs from "fs";
import path from "path";
import { format } from "date-fns";

const nowStr = format(new Date(), "yyyy_dd_MM");
const fileName = path.join("src", "log", nowStr);

if (!fs.existsSync(fileName)) {
  fs.writeFileSync(fileName, "");
}

const logger = pino(
  {
    prettyPrint: true,
  },
  pino.destination(fileName)
);

export default logger;
