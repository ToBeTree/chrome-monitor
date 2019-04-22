const puppeteer = require('puppeteer')
const {
    showPerformanceInfo,
    extraPerformanceTiming
} = require('./helpers')
const urlResult = {}
/**
 * 通过浏览器实例对象打开targetUrl页面，获取当前页面性能数据
 * @param {Object} browser 浏览器实例对象
 * @param {String} targetUrl 目标URL
 */
function testPage(browser, targetUrl) {

    // const browser = await puppeteer.launch({
    //     headless: true,
    //     // args: ['--start-maximized']
    // })

    return new Promise(async (resolve, reject) => {
        const page = await browser.newPage()

        await page.setViewport({
            width: 1280,
            height: 720
        })

        page.on('request', (req) => {})

        page.on('response', (res) => {
            // console.log(res)
            // console.log(res.url())
        })

        const resources = {}
        //page._client就是createCDPSession对象，可以直接使用Chrome-remote-interface协议进行通信
        page._client.on('Network.responseReceived', (param) => {
            resources[param.response.url] = param.response.encodedDataLength
            // console.log(param.response.status, param.response.encodedDataLength)
        })

        const actualData = {}
        page._client.on('Network.dataReceived', (event) => {
            // 通过requestID得到具体的请求
            const request = page._networkManager._requestIdToRequest.get(
                event.requestId
            )
            if (request && request.url().startsWith('data:')) {
                return
            }
            const url = request.url()

            const length = event.dataLength
            // const length = event.encodedDataLength > 0 ? event.encodedDataLength : event.dataLength
            if (url in actualData) {
                actualData[url] += length
            } else {
                actualData[url] = length
            }
        })

        page.goto(targetUrl, {
            //修改默认30000ms超时时间
            waitUntil: 'load',
            timeout: 0
        }).then(async () => {

            // console.log(data)
            const performance = await page.evaluate(() => {
                // 从对象中解析出来timing对象值并转化成JSON对象
                // return JSON.parse(JSON.stringify(window.performance))
                return window.performance.toJSON()
            })

            const snapShotData = await page.screenshot({
                encoding: "base64"
            })

            // console.log(resources)
            const totalUncompressedBytes = Object.values(resources).reduce((a, n) => a + n, 0)
            const totalRequestCount = Object.values(resources).length
            const totalUncompressedBytes2 = Object.values(actualData).reduce((a, n) => a + n, 0)
            const totalRequestCount2 = Object.values(actualData).length
            console.log(`页面下载总量:${totalUncompressedBytes}`)
            console.log(`页面请求总量:${totalRequestCount}`)
            console.log(`页面下载总量2:${totalUncompressedBytes2}`)
            console.log(`页面请求总量2:${totalRequestCount2}`)
            urlResult.requestCount = totalRequestCount
            urlResult.timing = extraPerformanceTiming(performance.timing)
            urlResult.requestSize = totalUncompressedBytes
            // urlResult.pageSnapshot = snapShotData
            // performanceMetrics = await page._client.send('Performance.getMetrics')
            // console.log(performanceMetrics)

            // showPerformanceInfo(extraPerformanceTiming(performance.timing))
            // return performance.timing
            await page.close()
            return urlResult
        }).then((result) => {
            // 处理返回结果
            console.log('page load fired')
            resolve(result)
        }).catch((result) => {
            //页面捕捉到错误，返回一个空对象
            console.log('访问页面报错')
            reject({})
        })

    })
}

// testPage()
module.exports = {
    testPage
}