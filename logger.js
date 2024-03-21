const { createLogger, transports, format } = require('winston');
const { combine, timestamp, printf } = format;

const logger = createLogger({
    format: combine(
        timestamp(),
        printf(({ level, message, timestamp }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
    ),
    transports: [
        new transports.File({ filename: 'app.log' }) // Log to a file
    ]
});

module.exports = logger;
