/**
 * Module dependencies.
 */
var checkParameters = /\b(stage|production|release|test)\b/;
if (!checkParameters.test(process.env.NODE_ENV)) {
  console.log(
      'Configuration type not defined (production, stage, release, test)');
  process.exit(1);
}
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
  console.log(err);
  console.log(err.stack);
  // handle the error safely
  logger.error('uncaughtException occurred: ' + err.stack);
  logger.error(err);
  process.exit(1);
});

var MongoClient = require('mongodb').MongoClient;
var connectionParams = config.mongodb;

var ConnectionStore = require('connection-store');
var initStorage = require('./initStorages');

module.exports = function(callback) {
  MongoClient.connect(
      'mongodb://' + connectionParams.host + ':' +
      connectionParams.port + '/' + connectionParams.db, function(err, db) {
        logger.info('Check for MongoConnection');
        logger.info(new Date());
        logger.info(
            'mongodb://' + connectionParams.host + ':' +
            connectionParams.port + '/' + connectionParams.db);
        if (err) {
          logger.error('Mongo connection error');
          logger.error(err);
          return;
        }
        logger.info('MongoConnection: OK');
        ConnectionStore.addConnection(db);
        initStorage.init();
        callback();
      });
};
