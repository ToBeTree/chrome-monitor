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
        version: 'b-yongqiangw-190403',
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

function parse(data) {
    let urls = data.map(company => company.urls.map(url => url.url))
    console.log(urls)
    return urls
}

parse(data)