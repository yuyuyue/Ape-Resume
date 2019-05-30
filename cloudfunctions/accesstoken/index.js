// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const access_token_url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx08451edee750006e&secret=4e454e614157d0e7df4b2d926453bc6c'
  const result = await axios({
    method: 'get',
    url: access_token_url,
    headers: {
      accept: 'application/json',
    }
  })
  const access_token = result.data.access_token
  const wxcode_url = `https://api.weixin.qq.com/wxa/getwxacode?access_token=${access_token}`
  const result_wx = await axios({
    method: 'post',
    url: wxcode_url,
    headers: {
      accept: 'application/json',
    },
    data: {
      path: "pages/index/index",
      width: 430,
    },
  })
  console.log(result_wx.data)
}