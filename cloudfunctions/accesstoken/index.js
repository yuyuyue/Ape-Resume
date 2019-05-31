// 云函数入口文件
const cloud = require('./node_modules/wx-server-sdk')
const fs = require('fs')
const axios = require('./node_modules/axios')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let {access_token} = event
  if (!access_token) {
    const access_token_url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx08451edee750006e&secret=4e454e614157d0e7df4b2d926453bc6c'
    const result = await axios({
      method: 'GET',
      url: access_token_url,
      headers: {
        accept: 'application/json',
      }
    })
    access_token = result.data.access_token
  }
  const wxcode_url = `https://api.weixin.qq.com/wxa/getwxacode?access_token=${access_token}`
  const result_wx = await axios({
    method: 'POST',
    url: wxcode_url,
    responseType: 'arraybuffer', //这一行非常重要，重中之重
    headers: {
      'content-type': 'application/json',
    },
    data: {
      path: 'pages/index/index',
      width: 290,
      auto_color: false,
      line_color: {
        'r': 118,
        'g': 168,
        'b': 240
      }
    },
  })
  const wxcode_buffer = result_wx.data
  console.log(wxcode_buffer)
  
  // var base64Image = origin_buffer.toString('base64')
  // console.log(base64Image);
  // var decodedImage = new Buffer(base64Image, 'base64');
  // console.log(Buffer.compare(origin_buffer, decodedImage))
  return {
    wxacode: wxcode_buffer,
    access_token
  }
}