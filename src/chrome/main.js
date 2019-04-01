const task = require('./task')
const utils = require('../utils/utils')

const companys = ['途家', '小猪短租', '爱彼迎']
const pageTypes = ['main', 'list', 'detail', 'discovery']

// const urls = ['https://www.airbnb.cn/', 'http://www.xiaozhu.com/', 'https://www.tujia.com/']

const urls = ['https://www.baidu.com/']
const run = async function () {
  // let rootReport = utils.makeRootDirectory()
  let rootReport = ''

  for (let i = 0; i < urls.length; i++) {
    console.log('-----------------------------')
    console.log('start one task.')
    console.log('-----------------------------')
    let re = await task.task(urls[i], rootReport)
    // console.log(re)
    console.log('-----------------------------')
    console.log('end one task.')
    console.log('-----------------------------')
  }
}

run()