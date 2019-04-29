import {
    logger
} from "../utils/logger";
/**
 * 得到各种性能指标
 * @param {Object} perforceTiming W3C性能timing对象
 */
function extraPerformanceTiming(perforceTiming) {
    let timingGather = {}
    perforceTiming = perforceTiming || {}
    // 页面重定向耗时
    timingGather.redirect = perforceTiming.redirectEnd - perforceTiming.redirectEnd - perforceTiming.redirectStart
    // DNS查找耗时
    timingGather.dns = perforceTiming.domainLookupEnd - perforceTiming.domainLookupStart
    // TCP连接耗时
    timingGather.tcp = perforceTiming.connectEnd - perforceTiming.connectStart
    // 请求发送耗时
    timingGather.request = perforceTiming.responseStart - perforceTiming.requestStart
    // 响应接收耗时
    timingGather.response = perforceTiming.responseEnd - perforceTiming.responseStart
    // DOMReady耗时
    timingGather.domReady = perforceTiming.domContentLoadedEventStart - perforceTiming.navigationStart
    // 页面加载耗时
    timingGather.load = perforceTiming.loadEventStart - perforceTiming.navigationStart
    return timingGather
}

const showPerformanceInfo = (performanceInfo) => {
    performanceInfo = performanceInfo || {}
    logger.debug(`页面重定向耗时:${performanceInfo.redirect}`)
    logger.debug(`DNS查找耗时:${performanceInfo.dns}`)
    logger.debug(`TCP连接耗时:${performanceInfo.tcp}`)
    logger.debug(`请求发送耗时:${performanceInfo.request}`)
    logger.debug(`响应接收耗时:${performanceInfo.response}`)
    logger.debug(`DOMReady耗时:${performanceInfo.domReady}`)
    logger.debug(`页面加载耗时:${performanceInfo.load}`)
}

function parseRequestData(req) {

}

function compressResult(extraData, internalData) {
    // let data = {
    //     company: 'airbnb',
    //     version: '',
    //     urls: [{
    //             type: 'main',
    //             url: 'http://www.baidu.com'
    //         },
    //         {
    //             type: 'detail',
    //             url: 'https://cn.bing.com'
    //         }
    //     ]
    // }

    // let data2 = [{
    //         requestCount: 26,
    //         timing: {
    //             redirect: 0,
    //             dns: 45,
    //             tcp: 322,
    //             request: 100,
    //             response: 4,
    //             domReady: 827,
    //             load: 832
    //         },
    //         requestSize: 6714
    //     },
    //     {
    //         requestCount: 26,
    //         timing: {
    //             redirect: 0,
    //             dns: 45,
    //             tcp: 322,
    //             request: 100,
    //             response: 4,
    //             domReady: 827,
    //             load: 832
    //         },
    //         requestSize: 6714
    //     }
    // ]
    let newExtraData = JSON.parse(JSON.stringify(extraData))
    let newInternalData = JSON.parse(JSON.stringify(internalData))
    // logger.debug(newInternalData)
    // logger.debug(newExtraData)
    let res = []
    newExtraData.urls.map((value, i) => {
        let result = newExtraData
        result.type = value.type
        result.url = value.url
        result.data = newInternalData[i]
        // logger.debug(data2[i])
        delete result.urls
        // return result
        res.push(JSON.parse(JSON.stringify(result)))
    })
    // logger.debug(res)
    return res
}
// compressResult()
module.exports = {
    extraPerformanceTiming,
    showPerformanceInfo,
    parseRequestData,
    compressResult
}