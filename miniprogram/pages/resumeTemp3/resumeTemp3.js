// miniprogram/pages/resumeTemp3/resumeTemp3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSave: true,
    not: false
  },
  saveRes() {
    console.log(123)
    this.setData({
      showDialog: true
    })
  },
  save(e) {
    wx.showLoading({
      title: '加载中'
    })
    let codeInfo = {
      '1': '简历重名'
    }

    console.log(e.detail.resumeName);
    let data = {}
    data.name = e.detail.resumeName;
    data.tempIndex = 1;
    data.proNames = this.data.selected.items.map(item => item.proname)
    data.expeNames = this.data.selected.works.map(item => item.company)
    data.apes = this.data.apes
    wx.cloud.callFunction({
      name: 'resume',
      data: {
        opt: 'add',
        data
      }
    }).then(res => {
      wx.hideLoading()
      console.log(res);
      if (!res.result.code) {
        wx.showModal({
          title: '保存成功',
          content: '是否前往分享',
          cancelText: '返回首页',
          success(res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../resume/resume?nowSelect=' + data.name
              })
            } else if (res.cancel) {
              wx.switchTab({
                url: '../index/index'
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: codeInfo[res.result.code],
          image: '../../images/fail.svg.png'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中。。。'
    })
    if (options.not) {
      this.setData({
        not: true
      })
    }
    if (options.resumeName) {
      this.setData({
        isSave: false
      })
    }
    let key = options.resumeName || 'selected';
    wx.getStorage({
      key,
      success: (res) => {

        console.log(res.data);

        this.setData({
          selected: res.data
        })
        wx.getStorage({
          key: 'userdetail',
          success: (res) => {
            console.log(res);
            let apes = {};
            let selected = this.data.selected;
            if (!this.data.isSave) {
              wx.cloud.callFunction({
                name: 'resume',
                data: {
                  opt: 'selectByName',
                  data: {
                    name: options.resumeName
                  }
                }
              }).then(res1 => {
                selected.apes = res1.result.result.data[0].apes;
                selected.apes.forEach(item => {
                  apes[item.name] = res.data.searchData[item.name]
                })
                this.setData({
                  apes: selected.apes
                })
                selected.apes = apes;
                this.setData({
                  detail: res.data,
                  selected

                })
                wx.hideLoading()
              })
              // selected.apes = 
            } else {
              selected.apes.forEach(item => {
                apes[item.name] = res.data.searchData[item.name]
              })
              this.setData({
                apes: selected.apes
              })
              selected.apes = apes;
              this.setData({
                detail: res.data,
                selected

              })
              wx.hideLoading()
            }

          }
        })

      }
    })
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        this.setData({
          info: res.data
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