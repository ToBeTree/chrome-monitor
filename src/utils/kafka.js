const kafka = require('kafka-node')
const Producter = kafka.Producer
const client = new kafka.KafkaClient({
  kafkaHost: 'url:port'
})

var producter = new Producter(client)

function postData() {

  /**
   * 传递待发送的消息，发送完成后执行回调函数
   * @param {Object} callback kafka发送消息后的回调函数
   * @param {Object} message 待发送的消息
   */
  function sendMsg(callback, message) {
    producter.send([{
      topic: 'Web-Monitor',
      messages: ['test message'],
      attributes: 0
    }], callback)
  }

  producter.on('ready', function () {
    sendMsg(function (err, data) {
      if (err) {
        console.log('err: ', err)
      }
      console.log('data: ', data)

      // 关闭连接
      producter.close()
      client.close()
    })
  })

  producter.on('error', function (err) {
    console.log(err)
    // 发生错误后关闭生产者对象
    producter.close()
  })

}

postData()