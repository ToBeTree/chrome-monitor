const task = require('./task')
const utils = require('../utils/utils')

// const urls = ['https://www.airbnb.cn/', 'http://www.xiaozhu.com/', 'https://www.tujia.com/']
const urls = ['https://cn.bing.com/']
const run = async function () {
  let rootReport = utils.makeRootDirectory()
  // let re = await task.task('https://www.baidu.com/', rootReport)
  // console.log(typeof re)
  // await task.task('https://cn.bing.com/', rootReport)
  for (let i = 0; i < urls.length; i++) {
    console.log('-----------------------------')
    console.log('start one task.')
    console.log('-----------------------------')
    let re = await task.task(urls[i], rootReport)
    console.log('-----------------------------')
    console.log('end one task.')
    console.log('-----------------------------')
  }
}

run()