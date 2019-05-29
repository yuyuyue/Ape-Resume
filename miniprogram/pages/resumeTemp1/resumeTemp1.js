// miniprogram/pages/resume/resume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchData:{},
  },
  saveRes(){
    this.setData({
      showDialog:true
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'userdetail',
      success:(res)=>{
        console.log(res);
        
        this.setData({
          detail: res.data
        })
      }
    })
    wx.getStorage({
      key: 'userInfo',
      success:(res)=> {
        this.setData({
          info: res.data
        })
      }
    })
    wx.getStorage({
      key: 'selected',
      success:(res)=> {
        this.setData({
          selected: res.data
        })
      }
    })
    wx.getStorage({
      key: 'searchData',
      success: (res) => {
        this.setData({
          searchData: res.data
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