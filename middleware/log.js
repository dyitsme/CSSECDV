const logger = require('../logger');

const logAuth = (req, res, next) => {
    console.log(`req: ${req}`)
    logger.info(`Authentication: User ${req.session.user?.firstName} logged in.`);
    // console.log("logged")
    next();
}

const logTrans = (req, res, next) => {
    logger.info(`Transaction: ${req.method} request to ${req.originalUrl}`);
    next();
}

const logAdmin = (req, res, next) => {
    logger.info(`Admin Action: ${req.method} request to ${req.originalUrl} by user '${req.session.user.username}'`);
    next();
}

module.exports = {
  logAuth,
  logTrans,
  logAdmin
};
