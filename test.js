import {
    argv
} from 'optimist'
import * as yaml from 'js-yaml'
import * as fs from 'fs'

// npm run test -- --filter=type --value=main  --platform=chrome --branch= --pmo=
export const readArgv = function () {
    let property = {}
    property = argv

    // 只保留命令行传进来的参数
    delete property._
    delete property.$0

    return property
}

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
        // console.log(config[key])
        result = result.concat(config[key].filter(data => {
            if (data.type == type) return true
        }))
    }
    return result
}
let property = readArgv()
readConfig(property)
console.log(property)