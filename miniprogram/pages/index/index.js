// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
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
      url: `../makeRes/makeRes`
    })
  },
  howToUse() {
    wx.navigateTo({
      url: '../use/use'
    })
  },
  handleGetLocalUserInfo() {
    // wx.showLoading({
    //   title: '加载中。。'
    // })
    return new Promise((reso, rej) => {
     // 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
     wx.getSetting({
       success:(res)=>{
         if (res.authSetting['scope.userInfo']) {
           // 如果已经授权，可以直接调用 getUserInfo获取用户信息
           wx.getUserInfo({
             success: res=> {
              //  console.log(res.userInfo)
              reso(res.userInfo)
             }
           })
         } else {
           // 如果未授权，则跳转到授权页面
           wx.navigateTo({
             url: '/pages/authorize/authorize',
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
    // console.log('++++++',options);
    // this.handleGetLocalUserInfo().then(userInfo => {
    //   console.log(userInfo);

    //   // if (userInfo) {
    //   //   wx.setStorage({
    //   //     key: 'userInfo',
    //   //     data: userInfo
    //   //   })
    //   //   // console.log(this);

    //   //   this.setData({
    //   //     userInfo
    //   //   })
    //   //   wx.hideLoading()
    //   // } else 
    //   if (!userInfo) {
    //     // wx.hideLoading()
    //     wx.navigateTo({
    //       url: '/pages/authorize/authorize'
    //     })
    //   }else {
    //     this.setData({
    //       userInfo
    //     })
    //   }

    // })



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
    this.handleGetLocalUserInfo().then(userInfo => {
      //  console.log(userInfo);

      // if (userInfo) {
      //   wx.setStorage({
      //     key: 'userInfo',
      //     data: userInfo
      //   })
      //   // console.log(this);

      //   this.setData({
      //     userInfo
      //   })
      //   wx.hideLoading()
      // } else 
      if (!userInfo) {
        // wx.hideLoading()
        wx.navigateTo({
          url: '/pages/authorize/authorize'
        })
      } else {
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
        wx.setStorage({
          key: 'userInfo',
          data: userInfo
        })
        this.setData({
          userInfo
        })
      }

    })

    // wx.getStorage({
    //   key: 'userInfo',
    //   success: res => {
    //     // console.log('====', res);

    //     if (res.data) {
    //       // console.log(res.data);
    //       wx.cloud.callFunction({
    //         name: 'userdetail',
    //         data: {
    //           opt: 'selectById',
    //           data: {}
    //         },
    //         success: res => {
    //           wx.setStorage({
    //             key: 'userdetail',
    //             data: res.result.result.data[0]
    //           })
    //         }
    //       })
    //       this.setData({
    //         userInfo: res.data
    //       })
    //     }

    //   },
    //   fail: err => {
    //     console.log('1111');

    //   }
    // })
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