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
    let works = [],items = [];
    
    this.data.resumes[this.data.nowIndex].expeNames.forEach(item => {
      wx.cloud.callFunction({
        name: 'expe',
        data: {
          opt: 'selectByName',
          data: {
             company: item
          }
        }
      }).then(res=>{
        works.push(res.result.result.data[0])
      })
    })
    this.data.resumes[this.data.nowIndex].proNames.forEach(item => {
      wx.cloud.callFunction({
        name: 'project',
        data: {
          opt: 'selectByName',
         data: {
           proname: item
        }
        }
      }).then(res => {
        items.push(res.result.result.data[0])
         wx.setStorage({
           key: this.data.nowSelect,
           data: {
             works,
             items
           }
         })
      })
    })
   
    wx.navigateTo({
      url: `../resumeTemp${this.data.tempIndex}/resumeTemp${this.data.tempIndex}?resumeName=${this.data.nowSelect}`
    })
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
      console.log(res);

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