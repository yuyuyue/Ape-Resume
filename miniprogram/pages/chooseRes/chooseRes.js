// miniprogram/pages/chooseRes/chooseRes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumeTemps: [
      "../../images/email.png",
      "../../images/boy.png",
      "../../images/GitHub.png"
    ],
    current: 0
  },

  switchHandle(e) {

    let index = e.currentTarget.dataset.index
    this.setData({
      current: index
    })

  },
  // 联动
  scrollHandle(e) {

    let section = [];
    for (let i = 0; i <= this.data.resumeTemps.length; i++) {
      section.push(257.33 * i - 129);
      section.push(257.33 * i);
    }
    section.shift()
    // console.log(section, e.detail.scrollLeft);
    section.forEach((item, index) => {
      if (item < e.detail.scrollLeft && e.detail.scrollLeft < section[index + 1]) {
        this.setData({
          current: Math.floor(index / 2)
        })
      }
    })
  },
  mkresumeHandle() {
    let data = {}
    wx.cloud.callFunction({
      name: "userdetail",
      data: {
        opt: 'selectById',
        data
      },
      success: res => {
        // console.log(res);
        let queryData = res.result.result.data[0];
        wx.setStorage({
          key: 'userdetail',
          data: queryData
        })

      },
    })
    wx.navigateTo({
      url: `../resumeTemp${this.data.current + 1}/resumeTemp` + (this.data.current + 1)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(JSON.parse(decodeURIComponent(options.selected)));
    // console.log(JSON.stringify(options.selected));
    // for (let key in options.selected){
    // console.log(key);
    // // console.log(options.selected[key]);


    // }
    // wx.cloud.callFunction({
    //   name: 'resume',
    //   data: {
    //     opt: ''
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