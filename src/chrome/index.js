const wrapper = require('./chrome-wrapper')
// const fs = require('fs')
const utils = require('../utils/utils')

const result = {
  perforceTiming: {},
  requests: [{
    url: '',
    bodySize: '',
    time: {}
  }],
  screenshot: ''
}

wrapper.prepareAPI().then(([chromeInstance, client]) => {

  // extract domains
  const {
    Network,
    Page,
    Runtime
  } = client

  //页面发送请求时调用该方法
  Network.requestWillBeSent((params) => {
    // result.requests.url = params.request.url
    // console.log("yes: " + params.request.url)/
    // console.log(result.requests.url)
  })

  //页面接收请求之后调用该方法
  Network.responseReceived((params) => {
    result.requests.push({
      url: params.response.url,
      bodySize: params.response.encodedDataLength,
      time: params.response.timing
    })
    // console.log(params.response)
  })

  //页面加载完成之后调用该方法
  Page.loadEventFired(async () => {
    console.log(result.requests.length)
    //在控制台运行命令
    Runtime.evaluate({
      expression: 'window.performance.timing.toJSON()',
      returnByValue: true //不加这个参数，拿到的是一个对象的meta信息,还需要getProperties
    }).then((resultObj) => {
      let {
        result,
        exceptionDetails
      } = resultObj
      if (!exceptionDetails) {
        showPerformanceInfo(performanceParser(result.value))
      } else {
        throw exceptionDetails
      }
    })
    const {
      data
    } = await Page.captureScreenshot()
    utils.writeBase64ToImage('shot.png', data)
    client.close()
    // chromeInstance.kill()
  })

  Page.enable().then(async () => {
    await Network.enable()
    Page.navigate({
      url: 'https://www.baidu.com'
    })
  })
}).then(val => {
  // console.log('end')
}).catch(err => {
  // console.log('err')
})

const performanceParser = (perforceTiming) => {
  let timingGather = {}
  perforceTiming = perforceTiming || {}
  timingGather.redirect = perforceTiming.redirectEnd - perforceTiming.redirectEnd - perforceTiming.redirectStart
  timingGather.dns = perforceTiming.domainLookupEnd - perforceTiming.domainLookupStart
  timingGather.tcp = perforceTiming.connectEnd - perforceTiming.connectStart
  timingGather.request = perforceTiming.responseStart - perforceTiming.requestStart
  timingGather.response = perforceTiming.responseEnd - perforceTiming.responseStart
  timingGather.domReady = perforceTiming.domContentLoadedEventStart - perforceTiming.navigationStart
  timingGather.load = perforceTiming.loadEventStart - perforceTiming.navigationStart
  return timingGather
}

const showPerformanceInfo = (performanceInfo) => {
  performanceInfo = performanceInfo || {}
  console.log(`页面重定向耗时:${performanceInfo.redirect}`)
  console.log(`DNS查找耗时:${performanceInfo.dns}`)
  console.log(`TCP连接耗时:${performanceInfo.tcp}`)
  console.log(`请求发送耗时:${performanceInfo.request}`)
  console.log(`响应接收耗时:${performanceInfo.response}`)
  console.log(`DOMReady耗时:${performanceInfo.domReady}`)
  console.log(`页面加载耗时:${performanceInfo.load}`)
}