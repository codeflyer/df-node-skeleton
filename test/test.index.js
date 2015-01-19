var path = require('path');
var ConnectionStore = require('connection-store');

describe('Index test', function() {

  before(function(done) {
    require('readyness').doWhen(done);
  });

  beforeEach(function(done) {
    var fixtures = ConnectionStore.getConnection('fixtures');
    fixtures.clear(function(err) {
      fixtures.load(path.join(__dirname, 'fixtures'), done);
    });
  });

  it('First test', function() {
    'OK'.should.be.equal('OK');
  });
});
