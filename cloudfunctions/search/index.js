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
      if (!href) {
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
      let itemCounts = $('.item-count')
      let result = []
      spans[5] ? result.push(spans[5].children[0].data.split(',').join('')) : result.push('')
      itemCounts.eq(10) ? result.push(itemCounts.eq(10).html().split(',').join('')) : result.push('')
      spans[3] ? result.push(spans[3].children[0].data.split(',').join('')) : result.push('')
      itemCounts.eq(0) ? result.push(itemCounts.eq(0).html().split(',').join('')) : result.push('')
      spans[4] ? result.push(spans[4].children[0].data.split(',').join('')) : result.push('')
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
        $('h2') ? result.push($('h2').html().trim().split(' ')[0]) : result.push('')
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
      const rank = $('.e5i1odf10')
      const completeCount = $('.e5i1odf3')
      const completeRank = $('.e5i1odf12')
      const problem = $('.e5i1odf16')
      let result = []
      console.log(rank, '-------------',completeCount,'===============',completeRank, '\\\\\\\\\\\\\\\'', problem)
      console.log(rank.eq(0).html(), '-------------',completeCount.eq(15).html(),'===============',completeRank.eq(0).html(), '\\\\\\\\\\\\\\\'', problem.eq(0).html())
      
      // rank.eq(0) ? result.push(rank.eq(0).html().trim()): result.push('')
      // completeRank.eq(0) ? result.push(completeRank.eq(0).html().trim()): result.push('')
      // console.log('completeCount.eq(15).html()',completeCount.eq(15).html())
      // completeCount.eq(15) ? result.push(completeCount.eq(15).html().trim()) : result.push('')
      // problem.eq(0) ? result.push(problem.eq(0).html().trim().split('/')[0]): result.push('')
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