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
    console.log(`页面重定向耗时:${performanceInfo.redirect}`)
    console.log(`DNS查找耗时:${performanceInfo.dns}`)
    console.log(`TCP连接耗时:${performanceInfo.tcp}`)
    console.log(`请求发送耗时:${performanceInfo.request}`)
    console.log(`响应接收耗时:${performanceInfo.response}`)
    console.log(`DOMReady耗时:${performanceInfo.domReady}`)
    console.log(`页面加载耗时:${performanceInfo.load}`)
}

function parseRequestData(req) {

}

function compressResult() {

}
module.exports = {
    extraPerformanceTiming,
    showPerformanceInfo,
    parseRequestData,
    compressResult
}