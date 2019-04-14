const result = require('./dataformat').result
const program = require('commander')

// var argv = process.argv.splice(2)
// console.log(argv)

program.option('-p,--platform [type]', 'runtime env').parse(process.argv)
if (program.platform) console.log(program.platform)

const data = {
    platform: '', //运行平台
    company: '', //公司
    url: '', //页面地址
    repo: '', //仓库地址 可选参数
    branch: '', //分支名 可选参数
    batch: '', //请求批次
    pmo: '', //pmo号 可选参数
    pageType: '', //页面地址类型
    requestCount: 0, //页面中请求总数
    startTime: '', //开始请求时间
    endTime: '', //结束请求时间
    redirect: 0, //页面重定向耗时
    dns: 0, //DNS查找耗时
    tcp: 0, //TCP链接耗时
    request: 0, //请求发送耗时
    response: 0, //响应接收耗时
    domReady: 0, //DOMReady耗时
    load: 0, //页面加载耗时
    downloadSize: 0, //页面下载总量
    captrueShot: '' //页面快照
}

const type = []