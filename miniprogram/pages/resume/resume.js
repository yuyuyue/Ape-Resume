
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
    resumes: [], //所有简历信息集合
    token: '', //小程序的token
    wxacodeImgUrl: '', //小程序码的url
    isShareImg: false, //是否生成分享图片
    shareImgSrc: '',
  },
  // 生存分享的二维码
  wxacodeShare() {
    console.log('fddfddfd')
    this.drawImage()
    this.setData({
      isShareImg: true
    })
  },
  drawImage() {
    const ctx = wx.createCanvasContext('drawWxacode')
    ctx.setFillStyle('#ffffff')
    ctx.fillRect(0, 0, 325, 450);
    ctx.setFontSize(28)
    ctx.setFillStyle('#6F6F6F')
    ctx.fillText('妖妖灵', 110, 200)
    ctx.drawImage(this.data.wxacodeImgUrl, 0, 0, 100, 100)
    ctx.draw()
  },
  canvasToImg() {
    const self = this
    // canvas画布转成图片
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 600,
      height: 800,
      quality: 1.0,
      destWidth: 600,
      destHeight: 800,
      canvasId: 'drawWxacode',
      success: function (res) {
        const path = res.tempFilePath
        console.log('==============',res.tempFilePath);
        self.setData({
          shareImgSrc: path
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  canvasSave() {
    const self = this
    const primose = new Promise((resolve, reject) => {
      self.canvasToImg()
      resolve('ok')
    }) 
    primose.then(() => {
      console.log('-----------------',self.data.shareImgSrc)
      //当用户点击分享到朋友圈时，将图片保存到相册
      wx.saveImageToPhotosAlbum({
        filePath: self.data.shareImgSrc,
        success(res) {
          console.log('-------------')
          wx.showModal({
            title: '存图成功',
            content: '图片成功保存到相册了，去发圈噻~',
            showCancel: false,
            confirmText: '好哒',
            confirmColor: '#72B9C3',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
              }
              self.setData({
                isShareImg: false
              })
            }
          })
        },
        fail(err) {
          console.log(err)
        }
      })
    })
  },

  // 选择简历
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
    let works = [], items = [];
    this.data.resumes[this.data.nowIndex].expeNames.forEach(item => {
      wx.cloud.callFunction({
        name: 'expe',
        data: {
          opt: 'selectByName',
          data: {
            company: item
          }
        }
      }).then(res => {
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
    const self = this
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
    })
    if (self.data.wxacodeImgUrl == '') {
      wx.cloud.callFunction({
        name: 'accesstoken',
      })
        .then((res) => {
          console.log(res)
          const base64 = wx.arrayBufferToBase64(res.result)
          self.setData({
            wxacodeImgUrl: `data:image/png;base64,${base64}`
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
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
  onShareAppMessage: function (event) {
    // console.log(event.target.dataset.share)
    // const shareMethod = event.target.dataset.share
    // switch(shareMethod) {
    //   case 'wechat': 
    // }

  }
})