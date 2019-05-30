// miniprogram/pages/resume/resume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickInit: '请选择简历',
    resnames: [
      "第一份简历", "第二份简历"
    ], //简历名集合
    resumedetail: {},
    nowSelect: '', // 当前pick文字内容,
    nowIndex: 0,
    tempIndex: 0, //模板页索引
    detail: {},
    resumes: [] //所有简历信息集合
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      nowSelect: this.data.resumes[e.detail.value].name,
      nowIndex: e.detail.value,
      tempIndex: this.data.resumes[e.detail.value].tempIndex,
      pickInit: ''
    })

  },
  // 跳转到简历详情页
  resumedtlHandle() {
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx08451edee750006e&secret=4e454e614157d0e7df4b2d926453bc6c',
      method: 'Post',
      success(res) {
        console.log(res.data.access_token)
        let opt = {
          "access_token": res.data.access_token,
          "page":"pages/index/index"
        }
        wx.request({
          method: 'POST',
          url: `https://api.weixin.qq.com/wxa/getwxacode?access_token=${res.data.access_token}`,
          data: JSON.stringify(opt),
          success(result) {
            console.log(result)
          }
        })
      }
    })
    // const access_token_url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx08451edee750006e&secret=4e454e614157d0e7df4b2d926453bc6c'
    // let works = [],items = [];
    // this.data.resumes[this.data.nowIndex].expeNames.forEach(item => {
    //   wx.cloud.callFunction({
    //     name: 'expe',
    //     data: {
    //       opt: 'selectByName',
    //       data: {
    //          company: item
    //       }
    //     }
    //   }).then(res=>{
    //     works.push(res.result.result.data[0])
    //   })
    // })
    // this.data.resumes[this.data.nowIndex].proNames.forEach(item => {
    //   wx.cloud.callFunction({
    //     name: 'project',
    //     data: {
    //       opt: 'selectByName',
    //      data: {
    //        proname: item
    //     }
    //     }
    //   }).then(res => {
    //     items.push(res.result.result.data[0])
    //      wx.setStorage({
    //        key: this.data.nowSelect,
    //        data: {
    //          works,
    //          items
    //        }
    //      })
    //   })
    // })
    // wx.navigateTo({
    //   url: `../resumeTemp${this.data.tempIndex}/resumeTemp${this.data.tempIndex}?resumeName=${this.data.nowSelect}`
    // })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.cloud.callFunction({
      name: 'resume',
      data: {
        opt: 'selectAll',
        data: {}
      }
    }).then(res => {
      this.setData({
        resnames: res.result.result.data.map(item => item.name),
        resumes: res.result.result.data
      })
      //  if (options.nowSelect) {
      //    this.setData({
      //      nowSelect: options.nowSelect
      //    })
      //  }

      // return wx.cloud.callFunction({
      //   name: 'resume',
      //     data: {
      //       opt: 'selectByName',
      //       data: {
      //         name: this.data.nowSelect
      //       }
      //     }
      // })
    })
    // .then(res => {

    // })
    wx.getStorage({
      key: 'userdetail',
      success: res => {
        this.setData({
          detail: res.data
        })
      }
    }),
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'accesstoken',
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
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