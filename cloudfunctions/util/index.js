// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

class Utils {
  /**
   * 格式化日期
   * @param {*} date 
   */
  formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
  _formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
}

// 云函数入口函数
exports.Utils
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
   
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}