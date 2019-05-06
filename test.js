import {
    argv
} from 'optimist'
import * as yaml from 'js-yaml'
import * as fs from 'fs'

// npm run test -- --company=tujia --type=main --pmo=pt-110 
export const readArgv = function (argv) {
    let property = {}
    property = argv

    // 只保留命令行传进来的参数
    delete property._
    delete property.$0

    return property
}

const readConfig = function (property, path = './src/config/datasource.yml') {
    let config = yaml.safeLoad(fs.readFileSync(path))
    if (property.company != null) {
        config = config[property.company]
    }
    console.log(config)
    return config
}
let property = readArgv(argv)
readConfig(property)