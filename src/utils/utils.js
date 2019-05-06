const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

/**
 * 将base64数据转换成图片存储
 * @param {string} casePath a case report path
 * @param {string} fileName a filename to save
 * @param {string} data base64 image data
 */
const writeBase64ToImage = function (casePath, fileName, data) {
  let filePath = path.join(casePath, fileName)
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, Buffer.from(data, 'base64'))
    console.log(filePath + ' has writed success.')
    return filePath
  }
  console.log(filePath + ' has writed error.')
  return
}

/**
 * 接收一个url得到location路径或者域名
 * @param {string} url 
 */
const parseLocation = function (url) {
  var location = url.split('/').slice(-1).toString()
  return location === "" ? url.split(".")[1] : location.split('?')[0]
}

const formatDate = function (date) {
  function pad(n) {
    return n < 10 ? '0' + n : n
  }

  function padms(n) {
    return n < 100 ? n < 10 ? '00' + n : n : n
  }

  var year = date.getFullYear()
  var month = pad(date.getMonth() + 1)
  var day = pad(date.getDate())
  var hour = pad(date.getHours())
  var min = pad(date.getMinutes())
  var ms = pad(date.getMilliseconds())
  return year + "-" + month + "-" + day + "_" + hour + "_" + min + "_" + ms
}

/**
 * path可以不传，会按照当前时间自动生成path
 * @param {string} rootDirectory 一次任务报告的根目录
 */
const makeRootDirectory = function (rootDirectory) {
  console.log("start init root directory")
  let directory = path.join(__dirname, '../../reports/' + formatDate(new Date()))
  rootDirectory = typeof 'undefined' !== rootDirectory ? directory : null
  if (!fs.existsSync(rootDirectory)) {
    fs.mkdirSync(rootDirectory, {
      recursive: false
    })
    console.log('"' + rootDirectory + '" was created.')
    return rootDirectory
  } else {
    console.log('"' + rootDirectory + '" is NOT created.')
  }
}

const makeCaseDirectory = function (reportPath, caseName) {
  console.log('start init case directory: ' + caseName)
  // var casePath = reportPath + "/" + caseName
  let casePath = path.join(reportPath, caseName)
  if (!fs.existsSync(casePath)) {
    fs.mkdirSync(casePath)
    console.log('"' + casePath + '" was created.')
    return casePath
  } else {
    console.log('"' + casePath + '" is already created.')
  }
}

/**
 * 返回命令行中手动传入的参数
 * @param {Object} argv 命令行参数对象，包含整个执行命令的数据
 */
const readArgv = function (argv) {
  let property = {}
  property = argv

  // 只保留命令行传进来的参数
  delete property._
  delete property.$0

  return property
}

/**
 * 获取到将要被执行性能监控的URL数据
 * @param {Object} property 命令行传入的参数集合
 * @param {String} path 资源配置文件地址，有默认值
 */
const readConfig = function (property, path = '../config/datasource.yml') {
  let config = yaml.safeLoad(fs.readFileSync(path))
  if (property.company != null) {
    config = config[property.company]
  }
  return config
}

module.exports = {
  writeBase64ToImage,
  parseLocation,
  makeRootDirectory,
  makeCaseDirectory,
  readArgv,
  readConfig
}