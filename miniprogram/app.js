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
    // wx.login({
    //   success(res) {
    //       if (res.code) {
    //         // 发起网络请求
    //         console.log(res.code);
            
    //       } else {
    //         console.log('登录失败！' + res.errMsg)
    //       }
    //     }
    // })
  
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
            return;
          }
           wx.setStorage({
             key: 'userInfo',
             data: res.result.result.data[0]
           })
          // console.log(res.result);
          
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
