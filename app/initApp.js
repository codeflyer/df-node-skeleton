/**
 *
 * Module for the management of the MongoDb Connection.
 * Create the connection with mongodb and store it in the registry.
 * Expose a middleware method that chech the connection and send an error
 * message if the connection isn't intitialized yet.
 *
 * @module MongoDbStarter
 *
 * @author Davide Fiorello <davide@codeflyer.com>
 */
var MongoClient = require('mongodb').MongoClient;
var ConnectionStore = require('connection-store');
var logger = require('log4js').getLogger('main');

module.exports = function() {
  var isInit = false;
  var init = function(connectionParams) {
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
          isInit = true;
        });
  };

  /**
   * Middleware object that check if the connection is initialized
   */
  var startWhenIsReady = function(req, res, next) {
    if (isInit) {
      next();
      return;
    }
    res.end('Application not initialized!');
  };

  return {
    init: init,
    startWhenIsReady: startWhenIsReady
  };
}();
