import {
  getRequestData
}
from './api/api'

// const api = require('./api/api')

// getRequestData().then(data => {
//   console.log(data)
// });

getRequestData().then(res => {
  console.log(res.data)
})