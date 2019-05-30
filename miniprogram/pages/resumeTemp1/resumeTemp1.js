// miniprogram/pages/resume/resume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchData:{},
    showDialog: false,
    isSave: true
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
    if(options.resumeName){
      this.setData({
        isSave: false
      })
    }
    let key = options.resumeName || 'selected';
    // console.log(key);
    
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
      key,
      success:(res)=> {
        this.setData({
          selected: res.data
        })
        // console.log(res);
        
      }
    })
    wx.getStorage({
      key: 'searchData',
      success: (res) => {
        this.setData({
          searchData: res.data
        })
        // console.log('=====',this.data.searchData.Github['关注']);
        
      }
    })
  },
  save(e){
    let codeInfo  = {
      '1':'简历重名'
    }
    console.log(e.detail.resumeName);
    let data={}
    data.name = e.detail.resumeName;
    data.tempIndex = 1;
    data.proNames = this.data.selected.items.map(item => item.proname)
    data.expeNames = this.data.selected.works.map(item => item.company)
    wx.cloud.callFunction({
      name:'resume',
      data:{
        opt:'add',
        data
      }
    }).then(res=>{
      console.log(res);
      if(!res.result.code){
        wx.showModal({
          title: '保存成功',
          content: '是否前往分享',
          cancelText:'返回首页',
          success(res) {
            if (res.confirm) {
             wx.navigateTo({
               url: '../resume/resume?nowSelect=' + data.name
             })
            } else if (res.cancel) {
              wx.switchTab({
                url:'../index/index'
              })
            }
          }
        })
      }else{
        wx.showToast({
          title: codeInfo[res.result.code],
          image: '../../images/失败.png'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
   

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