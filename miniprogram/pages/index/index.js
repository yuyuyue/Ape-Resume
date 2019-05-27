// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  goTest() {
    wx.navigateTo({
      url: '../test/test'
    })
  },
  addInfo() {
    wx.navigateTo({
      url: '../addInfo/addInfo'
    })
  },
  makeRes() {
    wx.navigateTo({
      url: '../makeRes/makeRes'
    })
  },
  handleGetLocalUserInfo() {
    return new Promise((reso, rej) => {
      wx.getSetting({
        success: res => {
          console.log("set",res);
          
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: res => {
                const userInfo = res.userInfo;
                reso(userInfo)
              },
              fail: err=>{

              }
            })
          }else{
            wx.navigateTo({
              url: '/pages/authorize/authorize'
            })
          }
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'userdetail',
      data: {
        opt: 'selectById',
        data: {}
      },
      success: res => {
        wx.setStorage({
          key: 'userdetail',
          data: res.result.result.data[0]
        })
      }
    })
    this.handleGetLocalUserInfo().then(userInfo => {
      console.log(userInfo);
      
      if (userInfo) {
        wx.setStorage({
          key: 'userInfo',
          data: userInfo
        })
      } else {
        wx.navigateTo({
          url: '/pages/authorize/authorize'
        })
      }

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