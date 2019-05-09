import {
  argv
} from 'optimist'
import * as yaml from 'js-yaml'
import * as fs from 'fs'

/**
 * 返回命令行中手动传入的参数
 * @param {Object} argv 命令行参数对象，包含整个执行命令的数据
 */
const readArgv = function () {
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
 * @param {String} path 配置文件地址，除非有需要，不用修改
 */
const readConfig = function (property, path = './src/config/datasource.yml') {
  let config = {}

  if (property.filter == null && property.value == null) {
    config = yaml.safeLoad(fs.readFileSync(path))
  } else if (property.filter == null || property.value == null) {
    console.log('传入的参数非法，filter和value需要成对出现')
    return
  } else {
    if (property.filter == 'company') {
      config = readConfigByCompany(property.value, path)
    } else if (property.filter == 'type') {
      config = readConfigByType(property.value, path)
    }
  }
  console.log(config)
  return config
}

const readConfigByCompany = function (company, path) {
  let config = yaml.safeLoad(fs.readFileSync(path))
  return config[company]
}

const readConfigByType = function (type, path) {
  let config = yaml.safeLoad(fs.readFileSync(path))
  let result = []
  for (let key of Object.keys(config)) {
    result = result.concat(config[key].filter(data => {
      if (data.type == type) return true
    }))
  }
  return result
}


module.exports = {
  readArgv,
  readConfig,
}

// npm run test -- --filter=type --value=main  --platform=chrome --branch= --pmo=