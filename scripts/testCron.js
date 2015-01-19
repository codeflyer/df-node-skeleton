var runScript = require('../app/initScript');
var logger = require('log4js').getLogger('main');
logger.info('START');

runScript(function(err, result) {
  logger.info('RunScript');
  err = Math.floor(Math.random() * 2) + 0;
  if (err > 0) {
    logger.info('Error on cron');
    setTimeout(function() {
      process.exit(1);
    }, 500);
    return;
  }
  logger.info('Cron OK');
  setTimeout(function() {
    process.exit(0);
  }, 500);
});
