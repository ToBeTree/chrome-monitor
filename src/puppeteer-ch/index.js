const puppeteer = require('puppeteer')
const {
    parseRequestData,
    compressResult
} = require('./helpers')
const {
    testPage
} = require('./task')
const {
    data
} = require('./test')

const sectionResult = []

// const urls = ['https://www.baidu.com/', 'https://cn.bing.com/']
// const urls = ['https://www.baidu.com']

const token = new Date().getTime()

async function runSection(browser, urls) {
    // const browser = await puppeteer.launch({
    //     headless: false,
    //     // args: ['--start-maximized']
    // })
    // const sectionResult = []
    // for (let i = 0; i < urls.length; i++) {
    //     let res = {}
    //     res = await mission(browser, urls[i])
    //     let newObj = JSON.parse(JSON.stringify(res))
    //     // console.log(res)
    //     sectionResult.push(newObj)
    //     // sectionResult[i] = res
    //     console.log('one mission end')
    //     console.log('--------------------')
    // }
    // return sectionResult
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < urls.length; i++) {
            res = await mission(browser, urls[i])
            let newObj = JSON.parse(JSON.stringify(res))
            sectionResult.push(newObj)
            // sectionResult[i] = res
            console.log('one mission end')
            console.log('--------------------')
        }
        // console.log(sectionResult)
        resolve(sectionResult)
    })
    // await browser.close()
}

function mission(browser, url) {
    return new Promise(async (resolve, reject) => {
        const urlResult = await testPage(browser, url)
        // console.log(urlResult)
        console.log(`access page ${url} success`)
        // resolve('task done')
        //返回单个URL页面获取到的数据
        resolve(urlResult)
    })
}


async function start(data) {
    const browser = await puppeteer.launch({
        headless: true,
        // args: ['--start-maximized']
    })
    for (let i = 0; i < data.length - 1; i++) {
        let urls = data[i].urls.map(urls => urls.url)
        console.log(urls)
        let res = await runSection(browser, urls)
        // console.log(res)
        let result = compressResult(data[i], res)
        //push sectionResult Data 
    }

    setTimeout(() => {}, 500)
    await browser.close()
}

// runSection(urls)
start(data)