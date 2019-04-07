const puppeteer = require('puppeteer')
const {
    parseRequestData
} = require('./helpers')
const {
    testPage
} = require('./task')


const urls = ['https://www.baidu.com/', 'https://cn.bing.com/']
// const urls = ['https://www.baidu.com']

const token = new Date().getTime()
const data = [{
        company: 'airbnb',
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
        headless: true,
        // args: ['--start-maximized']
    })
    // console.log(browser)
    console.log(urls.length)
    for (let i = 0; i < urls.length; i++) {
        await mission(browser, urls[i])
        console.log('one task end')
        console.log('--------------------')
    }
    await browser.close()
}

function mission(browser, url) {
    return new Promise(async (resolve, reject) => {
        let urlResult = await testPage(browser, url)
        // console.log(urlResult)
        console.log(`access page ${url} success`)
        resolve('task done')
    })
}

run(urls)