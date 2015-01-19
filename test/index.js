process.env.NODE_CONFIG_PERSIST_ON_CHANGE = 'N';
process.env.NODE_ENV = 'test';

require('should');
var path = require('path');
var rootPath = path.join(__dirname, '../', '/');
global.ROOT_PATH_FOR_TEST = rootPath;

var config = require('config');

var log4js = require('log4js');
var logger = log4js.getLogger('main');
logger.setLevel('TRACE');

var ConnectionStore = require('connection-store');

var ready = require('readyness');
var MongoClient = require('mongodb').MongoClient;
var mongoConnected = ready.waitFor('mongoDbOk');
var fixtureConnected = ready.waitFor('fixtureDbOk');
MongoClient.connect(
    'mongodb://' +
    config.mongodb.host + ':' +
    config.mongodb.port + '/' +
    config.mongodb.db, function(err, db) {
      if (err) {
        throw err;
      }
      ConnectionStore.addConnection(db);
      mongoConnected();
    });

var fixtures = require('pow-mongodb-fixtures').connect(config.mongodb.db);
fixtures.clear(function(err) {
  ConnectionStore.addConnection('fixtures', fixtures);
  fixtureConnected();
});
