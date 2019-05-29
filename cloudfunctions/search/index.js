// 云函数入口文件
const cloud = require('wx-server-sdk')
const cheerio = require('cheerio')
const request = require('request')
const env = 'yby-d2ju2'
cloud.init()
const db = cloud.database({ env })

function juejin(url) {
  return new Promise((resolve, reject) => {
    request(url, (err, resp, body) => {
      if (err) {
        reject(err)
      }
      let $ = cheerio.load(body, { ignoreWhitespace: true, decodeEntities: true })
      var href = $('.link').attr('href')
      if (href === undefined) {
        resolve('无法获取链接')
      }
      const url = `https://juejin.im${href}`
      userPage(url).then(data => {
        resolve(data)
      })
    })
  })
}
function userPage(url) {
  return new Promise((resolve, reject) => {
    request(url, (err, resp, body) => {
      if (err) {
        reject(err)
      }
      let $ = cheerio.load(body, { ignoreWhitespace: true, decodeEntities: true })
      let spans = $('.count')
      let result = []
      spans[3] ? result.push(spans[3].children[0].data.split(',').join('')) : result.push('')
      spans[4] ? result.push(spans[4].children[0].data.split(',').join('')) : result.push('')
      spans[5] ? result.push(spans[5].children[0].data.split(',').join('')) : result.push('')
      let itemCounts = $('.item-count')
      itemCounts.eq(10) ? result.push(itemCounts.eq(10).html().split(',').join('')) : result.push('')
      resolve(result)
    })
  })
}
// 获取git的提交数
function contributions(url) {
  return new Promise((resolve, reject) => {
    try {
      request(url, (err, resp, body) => {
        if (err) {
          reject(err)
        }
        let $ = cheerio.load(body, { ignoreWhitespace: true, decodeEntities: true })
        let result = []
        $('h2') ? result.push($('h2').html().trim().charAt(0)) : result.push('')
        resolve(result)
      })
    } catch (e) {
      return reject(err)
    }
  })
}
// 仓库的收藏数
function stargazersCount(url) {
  return new Promise((resolve, reject) => {
    try {
      request({
        url,
        header: {
          'content-type': 'application/json'
        },
      }, (err, resp, body) => {
        if (err) {
          reject(err)
        }
        console.log(body)
        let count = body
      })
    } catch (e) {
      return reject(err)
    }
  })
}
// 力扣
function leetcode(url) {
  return new Promise((resolve, reject) => {
    request(url, (err, resp, body) => {
      if (err) {
        reject(err)
      }
      let $ = cheerio.load(body, { ignoreWhitespace: true, decodeEntities: true })
      const list = $('.progress-bar-success')
      let result = []
      list.eq(0) ? result.push(list.eq(0).html().trim()) : result.push('')
      list.eq(1) ? result.push(list.eq(1).html().trim()): result.push('')
      list.eq(2) ? result.push(list.eq(2).html().trim()): result.push('')
      list.eq(3) ? result.push(list.eq(3).html().trim().split('/')[0]): result.push('')
      resolve(result)
    })
  })
}
// 云函数入口函数
exports.main = async (event, context) => {
  const {
    url,
    opt
  } = event

  let result = {}
  let code = 0
  switch (opt) {
    case 'juejin': {
      result = await juejin(url)
      break
    }
    case 'gitContributions': {
      result = await contributions(url)
      break
    }
    case 'gitStargazersCount': {
      result = await stargazersCount(url)
      break
    }
    case 'leetcode': {
      result = await leetcode(url)
      break
    }
  }

  return {
    result,
    code
  }
}