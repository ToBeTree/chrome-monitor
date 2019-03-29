const chromeLaunch = require('chrome-launcher')
const chromeRemoteInterface = require('chrome-remote-interface')

const prepareAPI = function (config = {}) {
  const {
    host = 'localhost', port = 9222, autoSelectChrome = true, headless = true
  } = config


  const wrapper = chromeLaunch.launch({
    host,
    port,
    autoSelectChrome,
    chromeFlags: [
      '--disable-gpu',
      headless ? '--headless' : ''
    ]
  }).then(chromeInstance => {
    //拿到一个客户端的实例
    // console.log(chromeInstance.port)
    //得到chrome-remote-interface实例
    //通过chrome-remote-interface可以对Chrome devtool protocol协议进行操作
    const remoteInterface = chromeRemoteInterface(config).then(function (chromeAPI) {
      // console.log(chromeAPI)
      //chromeAPI就是ChromeDevToolsProtocol的接口实例
      //通过chromeAPI可以调用协议中定义的接口
      return chromeAPI
    }).catch(err => {
      throw err;
    });

    // console.log(chromeInstance)
    return Promise.all([chromeInstance, remoteInterface])
  }).catch(error => {
    throw error
  })
  return wrapper
}

module.exports = {
  prepareAPI
}