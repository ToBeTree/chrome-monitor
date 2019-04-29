var log4js = require('log4js')
var path = require('path')
log4js.configure({
  appenders: {
    console: {
      type: 'console'
    },
    date_file: {
      type: 'dateFile',
      filename: path.join(__dirname, '../../logs/cheese.log'),
      daysToKeep: 10,
      encoding: 'utf-8',
      pattern: "-yyyy-MM-dd.log",
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: {
      appenders: ['date_file', 'console'],
      level: 'debug'
    }
  }
});
var logger = log4js.getLogger()

logger.level = 'debug'

// logger.debug('debug message', __filename, __dirname)

module.exports = {
  logger
}

// export default logger