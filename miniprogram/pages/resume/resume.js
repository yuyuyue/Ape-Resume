// miniprogram/pages/resume/resume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickInit: '请选择简历',
    selectSex: [
      "第一份简历", "第二份简历"
    ],
    resumedetail: {},
    nowSelect: '',
    detail: {}
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sexIndex: e.detail.value,
      sex: this.data.selectSex[e.detail.value],
      pickInit: ''
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
    }).then(res=>{
      console.log(res);
      
      // this.setData({
      //   selectSex: res.result.result.data,
      //   nowSelect: res.result.result.data[0]
      // })
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
      success:res=>{
        this.setData({
          detail:res.data
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