// miniprogram/pages/workExp/workExp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startInit: '请选择',
    endInit: '请选择',
  },
  startDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value,
      startInit: '',
    })
  },
  endDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value,
      endInit: '',
    })
  },
  addWorkExp(e) {
    const data = e.detail.value;
    console.log(data);
    data.startDate = this.data.startDate;
    data.endDate = this.data.endDate;
    wx.cloud.callFunction({
      name: "expe",
      data: {
        opt: 'add',
        data
      },
      success: res => {
        if (!res.result.code) {
          wx.showModal({
            title: '添加成功',
            content: '是否继续添加',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: './workExp'
                })
              } else if (res.cancel) {
                wx.switchTab({
                  url: '../index/index'
                })
              }
            }
          })
        } else if (res.result.code == 6) {
          wx.showModal({
            title: '添加失败',
            content: '实习公司名重复，是否修改继续添加',
            success(res) {
              if (res.confirm) {

              } else if (res.cancel) {
                wx.switchTab({
                  url: '../index/index'
                })
              }
            }
          })
        }

      },
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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