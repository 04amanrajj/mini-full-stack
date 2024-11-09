const winston = require("winston");

exports.logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
        filename:"backend/logs/informations.log"
    }),
    new winston.transports.Console()],
});
