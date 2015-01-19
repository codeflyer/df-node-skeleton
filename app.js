/**
 * Module dependencies.
 */
var checkParameters = /\b(stage|production|release|test)\b/;
if (!checkParameters.test(process.env.NODE_ENV)) {
  console.log(
      'Configuration type not defined (production, stage, release, test)');
  process.exit(1);
}

var configEnvironment = process.env.NODE_ENV;
console.log('Application config: ' + configEnvironment);
process.env.NODE_CONFIG_PERSIST_ON_CHANGE = 'N';

/**
 * Init config
 */
var config = require('config');

/**
 * init logger
 */
var log4js = require('log4js');
log4js.configure(config.logs);
var logger = log4js.getLogger('main');
logger.setLevel('INFO');
logger.error('OK');

process.on('uncaughtException', function(err) {
  console.log('uncaughtException occurred: ' + err.stack);
  console.log(err);
  logger.error('uncaughtException');
  logger.error(err);
});

/**
 * Init Express
 */
var express = require('express');
var app = express();
app.set('port', process.env.PORT || config.server.port || 3001);

var flash = require('connect-flash');
app.use(flash());

/** Logger */
var logstream = log4js.getLogger('access');
app.use(
    log4js.connectLogger(
        logstream,
        {
          level: 'auto',
          'format': ':remote-addr - ":method :url HTTP/:http-version" ' +
          ':status - ":referrer" ":user-agent" - :response-time ms'
        }));

app.get('*', function(req, res, next) {
  if (configEnvironment === 'stage') {
    console.log(req.url);
  }
  next();
});

/**
 * Init MongoDb Connection
 */
var initApp = require('./app/initApp');
initApp.init(config.mongodb);

/** Routing */
app.all('*', initApp.startWhenIsReady);

var http = require('http');

require('./app/routes')(app);

var routeError = require('./app/routes/error');
app.get('*', routeError.error);

var max = 1000;
if (http.globalAgent.maxSockets < max) {
  http.globalAgent.maxSockets = max;
}

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
