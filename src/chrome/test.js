const task = require('./task')
const utils = require('../utils/utils')

const all_url = [{
  company: 'tujia',
  urls: [{
      url: 'https://www.tujia.com',
      type: 'main'
    },
    {
      url: 'https://www.tujia.com/detail/146497.htm?ssr=off',
      type: 'detail'
    }
  ]
}, {
  company: 'airbnb',
  urls: [{
    url: 'https://www.baidu.com',
    type: 'main'
  }, {
    url: 'https://cn.bing.com',
    type: 'detail'
  }]
}]

const result = {}

const token = new Date().getTime()

function start(all_url) {
  console.log(token)
  result.token = token
  all_url.forEach(company => {
    // console.log(company.urls)
    mission(company)
  });
}

function mission(company) {
  // console.log(company)
  let urls = company.urls.map(data => data.url)
  console.log(urls)
}

start(all_url)