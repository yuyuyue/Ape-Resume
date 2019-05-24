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
    nowIndex: 0
  },
  onNavBarTap: function (event) {
    let navbarTapIndex = event.currentTarget.dataset.navbarIndex
    this.setData({
      navbarActiveIndex: navbarTapIndex
    })
  },
  childSwiper(e) {
    console.log(e.detail.current)
    this.setData({
      nowIndex: e.detail.current
    })
  },
  /**
   * swiper组件切换事件
   */
  changeHandle(e) {
    
    let name;
    //避免多次请求
    if (this.data.navbarActiveIndex == 1 && !this.data.company) name = "expe";
    if (this.data.navbarActiveIndex == 2 && !this.data.techstack) name = "project";
    let data = {}
    wx.cloud.callFunction({
      name,
      data: {
        opt: 'selectAll',
        data
      },
      success: res => {
        console.log(res);
        let queryData = res.result.result.data[0];
        console.log(queryData);
        
        if (res.result.result.data.length) {
          this.setData({
            ...queryData
          })
        }

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        // console.log(res.data)
        this.setData({
          avatarUrl: res.data.avatarUrl,
          nickName: res.data.nickName
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
            ...queryData
          })
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