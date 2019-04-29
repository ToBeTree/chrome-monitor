const puppeteer = require('puppeteer')
import {
    logger
} from "../utils/logger";
const {
    parseRequestData
} = require('./helpers')
const {
    testPage
} = require('./task')

const sectionResult = []

const urls = ['https://www.baidu.com/', 'https://cn.bing.com/']
// const urls = ['https://www.baidu.com']

const token = new Date().getTime()
const data = [{
        company: 'airbnb',
        version: '',
        urls: [{
                type: 'main',
                url: 'http://www.baidu.com'
            },
            {
                type: 'detail',
                url: 'https://cn.bing.com'
            }
        ]
    },
    {
        company: 'tujia',
        version: '',
        urls: [{
                type: 'main',
                url: 'http://www.tujia.com'
            },
            {
                type: 'detail',
                url: 'https://www.tujia.com/detail/378195.htm?ssr=off'
            }
        ]
    }
]

async function run(urls) {
    const browser = await puppeteer.launch({
        headless: false,
        // args: ['--start-maximized']
    })
    // logger.debug(browser)
    logger.debug(urls.length)
    for (let i = 0; i < urls.length; i++) {
        await mission(browser, urls[i])
        logger.debug('one task end')
        logger.debug('--------------------')
    }
    await browser.close()
}

function mission(browser, url) {
    return new Promise(async (resolve, reject) => {
        let urlResult = await testPage(browser, url)
        // logger.debug(urlResult)
        // sectionResult.push
        logger.debug(`access page ${url} success`)
        resolve('task done')
    })
}

run(urls)