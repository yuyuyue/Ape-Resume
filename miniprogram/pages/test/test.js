// miniprogram/pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cards: [
      {
        name: 'Github',
        bgColor: 'bg-grey',
        color: 'grey',
        bottomColor: 'bottom-grey',
        tip: '输入自定义域名',
        image: '../../images/github.svg',
        search: 'github',
        icon: [
          {
            name: '提交数',
            iconPath: '../../images/submit.svg',
            num: '',
            color: 'grey'
          },
          {
            name: '关注',
            iconPath: '../../images/watch.svg',
            num: '',
            color: 'grey'
          },

          {
            name: '收藏',
            iconPath: '../../images/star.svg',
            num: '',
            color: 'grey'
          },
          {
            name: '叉子',
            iconPath: '../../images/fork.svg',
            num: '',
            color: 'grey'
          }
        ]
      },
      {
        name: '掘金',
        bgColor: 'bg-blue',
        color: 'blue',
        bottomColor: 'bottom-blue',
        tip: '输入掘金昵称',
        image: '../../images/juejin.svg',
        search: 'juejin',
        icon: [
          {
            name: '点赞',
            iconPath: '../../images/good.svg',
            num: '',
            color: 'blue'
          },
          {
            name: '文章数',
            iconPath: '../../images/article.svg',
            num: '',
            color: 'blue'
          },
          {
            name: '文章被阅读',
            iconPath: '../../images/watch1.svg',
            num: '',
            color: 'blue'
          },
          {
            name: '掘力值',
            iconPath: '../../images/up.svg',
            num: '',
            color: 'blue'
          },
          {
            name: '关注者',
            iconPath: '../../images/fans.svg',
            num: '',
            color: 'blue'
          }
        ],
      },
      {
        name: 'Leetcode',
        bgColor: 'bg-orange',
        color: 'orange',
        bottomColor: 'bottom-orange',
        tip: '输入自定义域名',
        image: '../../images/leetcode.svg',
        search: 'leetcode',
        icon: [
          {
            name: '竞赛数',
            iconPath: '../../images/number.svg',
            num: '',
            color: 'orange'
          },
          {
            name: '竞赛积分',
            iconPath: '../../images/point.svg',
            num: '',
            color: 'orange'
          },
          {
            name: '竞赛排名',
            iconPath: '../../images/rank.svg',
            num: '',
            color: 'orange'
          },
          {
            name: '刷题数',
            iconPath: '../../images/problem.svg',
            num: '',
            color: 'orange'
          },
        ]
      }
    ],
    searchData: {},
    ishelp: false,
    windowHeight: ''
  },
  searched(event) {
    const { name, num } = event.detail
    const searchData = {}
    let cards = this.data.cards
    for (let card of cards) {
      const iconLength = card.icon.length
      if (card.name === name) {
        for (let i = 0; i < iconLength; i++) {
          card.icon[i].num = num[i]
        }
      }
      let data = {}
      for (let i = 0; i < iconLength; i++) {
        data[card.icon[i].name] = card.icon[i].num
      }
      searchData[card.name] = data
    }
    this.setData({
      cards,
      searchData
    })

  },
  finish() {
    const self = this
    wx.showModal({
      title: '提示',
      content: '是否要生成简历',
      cancelText: '继续完善',
      confirmText: '前往',
      success (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../makeRes/makeRes'
          })
        } else if (res.cancel) {
          wx.navigateBack({
            delta: 1
          })
        }
      },
      fail(err) {
        console.log(err)
      },
      complete:()=>{
        wx.setStorage({
          key: "cards",
          data: self.data.cards
        })
        wx.setStorage({
          key: 'searchData',
          data: self.data.searchData
        })
      }
    })
  },
  help() {
    this.setData({
      ishelp: true
    })
  },
  helpClose() {
    this.setData({
      ishelp: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this
    wx.getStorage({
      key: 'cards',
      success(res) {
        self.setData({
          cards: res.data
        })
      },
      fail() {
        console.log('还没有存储Storage')
      }
    })
    /*获取屏幕高度*/
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})