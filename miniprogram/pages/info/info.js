Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbarActiveIndex: 0,
    navbarTitle: [
      "基本信息",
      "工作经验",
      "项目成果",
      "猿力值"
    ],
    scrollIndex: 0,
    workNowIndex: 0,
    proNowIndex: 0,
    item: {

    },
    basicInfo: {

    },
    projects: [],
    expes: []
  },
  onNavBarTap: function (event) {
    let navbarTapIndex = event.currentTarget.dataset.navbarIndex
    this.setData({
      navbarActiveIndex: navbarTapIndex
    })
  },
  childExpeSwiper(e) {
    // console.log(e.detail.current)
    this.setData({
      workNowIndex: e.detail.current
    })
  },
  childProSwiper(e) {
    // console.log(e.detail.current)
    this.setData({
      proNowIndex: e.detail.current
    })
  },
  /**
   * swiper组件切换事件
   */
  changeHandle(e) {
    
    let name;
    //避免多次请求
    if (this.data.navbarActiveIndex == 1 && !this.data.expes.length) name = "expe";
    if (this.data.navbarActiveIndex == 2 && !this.data.projects.length) name = "project";
    let data = {}
    wx.cloud.callFunction({
      name,
      data: {
        opt: 'selectAll',
        data
      },
      success: res => {
        // console.log(res);
        let queryData = res.result.result.data;
        console.log(queryData);
        let key = name + 's';
        if (res.result.result.data.length) {
          this.setData({
            [key]: queryData
          })
        }

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载。。。'
    })
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        // console.log(res.data)
        this.setData({
          basicInfo: res.data
        })

      }
    })
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
        if (res.result.result.data.length) {
          this.setData({
            item:queryData
          })
          wx.hideLoading()
        }

      },
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