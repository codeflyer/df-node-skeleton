/**
 * @author Davide Fiorello <davide@codeflyer.com>
 */
var indexCtrl = require('./routes/index');
var testCtrl = require('./routes/test');

module.exports = function(app) {
  app.get('/', indexCtrl);
  app.get('/test', testCtrl);
};
