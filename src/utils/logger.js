var log4js = require('log4js')
var path = require('path')
log4js.configure({
  appenders: {
    console: {
      type: 'console'
    },
    date_file: {
      type: 'dateFile',
      filename: path.join(__dirname, '../../logs/access.log'),
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
    },
    console: {
      appenders: ['console'],
      level: 'debug'
    }
  }
});
var logger = log4js.getLogger()

// Logger的分类需要和configure里面的categories里面保持一致，如不一致默认走default配置
var logger = log4js.getLogger('web-monitor')

exports.setLoggerCatagory = function (category) {
  logger = log4js.getLogger(category)
}

exports.setLevel = function (level) {
  logger.level = level
}

exports.trace = function (message) {
  logger.trace(message)
}

exports.debug = function (message) {
  logger.debug(message)
}

exports.info = function (message) {
  logger.info(message)
}

exports.warn = function (message) {
  logger.warn(message)
}

exports.error = function (message) {
  logger.error(message)
}

module.exports = {
  logger
}

// export default logger