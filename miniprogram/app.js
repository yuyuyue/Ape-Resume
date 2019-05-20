//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}
    this.queryUsreInfo()
  
  },
    queryUsreInfo() {
      wx.cloud.callFunction({
        // 云函数名称
        name: 'user',
        // 传给云函数的参数
        data: {
          opt: "selectById",
          data: {}
        },
        success: function (res) {
          // console.log(res.result);
          if(!res.result.result.data.length){
            wx.navigateTo({
              url: '/pages/authorize/authorize'
            })
          }
          getApp().globalData.userInfo = res.result;
        },
        fail:function (err) {
          wx.navigateTo({
            url: '/pages/authorize/authorize'
          })
        }
      })
    }

})
