/*
 * GET home page.
 */
exports.error = function(req, res) {
  var errorStatus = 404;
  res.status(errorStatus).end('ERROR');
};
