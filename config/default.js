var path = require('path');
var APPLICATION_PATH = path.join(__dirname, '..');

module.exports =
{
  'appName': 'ApplicationDb',
  'server': {
    'fullUrl': 'http://localhost:3000',
    'protocol': 'http',
    'port': 3000,
    'host': 'localhost'
  },
  'mongodb': {
    'host': '127.0.0.1',
    'port': 27017,
    'db': 'ApplicationDatabase',
    'options': {}
  },
  'logs': {
    'appenders': [
      {
        'type': 'file',
        'filename': 'logs/main.log',
        'maxLogSize': 2048000000,
        'backups': 3,
        'category': 'main'
      },
      {
        'type': 'file',
        'absolute': true,
        'filename': 'logs/access.log',
        'maxLogSize': 2048000000,
        'backups': 10,
        'category': 'access'
      }
    ]
  }
};
