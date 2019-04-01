const wrapper = require('./chrome-wrapper')
// const fs = require('fs')
const utils = require('../utils/utils')

const result = {
  perforceTiming: {},
  requests: [
    /*{
        url: '',
        bodySize: 0,
        time: {}
      }*/
  ],
  downloadSize: 0,
  screenshot: []
}

const task = function (targetUrl, rootReport) {
  // let caseName = utils.parseLocation(targetUrl)
  // let casePath = utils.makeCaseDirectory(rootReport, caseName)
  return new Promise((resolve, reject) => {
    wrapper.prepareAPI().then(([chromeInstance, client]) => {
      // extract domains
      const {
        Network,
        Page,
        Runtime,
        Emulation
      } = client

      //页面发送请求时调用该方法
      Network.requestWillBeSent((params) => {
        // result.requests.url = params.request.url
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
        console.log("页面请求url数量:" + result.requests.length)
        //在控制台运行命令
        let perforceTiming = Runtime.evaluate({
          expression: 'window.performance.timing.toJSON()',
          returnByValue: true //不加这个参数，拿到的是一个对象的meta信息,还需要getProperties
        }).then((resultObj) => {
          let {
            result,
            exceptionDetails
          } = resultObj
          if (!exceptionDetails) {
            perforceTiming = performanceParser(result.value)
            // showPerformanceInfo(performanceParser(result.value))
            return perforceTiming
          } else {
            throw exceptionDetails
          }
        })
        let downloadSize = result.requests.map((request) => request.bodySize).reduce((pre, cur) => pre + cur, 0)
        // console.log(`页面总下载量:${downloadSize}`)
        const {
          data
        } = await Page.captureScreenshot()
        // result.requests.url = targetUrl
        // result.requests.bo
        // utils.writeBase64ToImage(casePath, 'captureScreenshot.png', data)
        // await captureFullScreenshot(client, casePath)
        result.downloadSize = downloadSize
        result.perforceTiming = perforceTiming
        // result.screenshot = data
        client.close()
        chromeInstance.kill()
        resolve(result)
      })

      Page.enable().then(async () => {
        await Network.enable()
        Page.navigate({
          // url: 'https://www.baidu.com'
          url: targetUrl
        })
      })
    }).then(val => {
      // console.log('end')
    }).catch(err => {
      // console.log('err')
    })
  })
}
const captureFullScreenshot = async function (client, casePath) {
  const {
    DOM,
    Emulation,
    Network,
    Page
  } = client

  await Page.enable()
  await DOM.enable()
  await Network.enable()

  const {
    root: {
      nodeId: documentNodeId
    }
  } = await DOM.getDocument()
  const {
    nodeId: bodyNodeId
  } = await DOM.querySelector({
    selector: 'body',
    nodeId: documentNodeId,
  })
  const {
    model: {
      height,
      width
    }
  } = await DOM.getBoxModel({
    nodeId: bodyNodeId
  })

  console.log(`Set visible size to the height:${height} and width:${width} of the dom`)

  const deviceMetrics = {
    width: width,
    height: height,
    deviceScaleFactor: 1,
    mobile: false,
    fitWindow: false,
  }
  await Emulation.setDeviceMetricsOverride(deviceMetrics)
  await Emulation.setVisibleSize({
    width: width,
    height: height
  })

  const {
    data
  } = await Page.captureScreenshot()
  await Emulation.clearDeviceMetricsOverride()
  utils.writeBase64ToImage(casePath, 'captureFullScreenshot.png', data)
}

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

module.exports = {
  task
}