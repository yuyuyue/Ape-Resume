
// miniprogram/pages/resume/resume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickInit: '请选择简历',
    resnames: [], //简历名集合
    resumedetail: {},
    nowSelect: '', // 当前pick文字内容,
    nowIndex: 0,
    tempIndex: 0, //模板页索引
    detail: {},
    resumes: [], //所有简历信息集合
    token: {}, //小程序的token
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
    const wxacode = this.data.wxacodeImgUrl
    ctx.setFillStyle('#76A7F0')
    ctx.fillRect(0, 0, 250, 367)
    ctx.setFillStyle('#B2CEF8')
    ctx.fillRect(10, 10, 230, 347)
    
    // 文字
    ctx.setFontSize(20)
    ctx.setFillStyle('#ffffff')
    ctx.fillText('让你的简历脱颖而出', 32, 62)
    ctx.setFontSize(40)
    ctx.fillText('猿简历', 67, 140)
    ctx.setFontSize(18)
    ctx.fillText('扫一扫生成你的最强简历', 26, 320)

    // 三角形
    ctx.setStrokeStyle('#ffffff')
    ctx.beginPath()
    ctx.moveTo(29, 7)
    ctx.lineTo(58, 2)
    ctx.lineTo(48, 25)
    ctx.lineTo(29, 7)
    ctx.closePath()
    ctx.stroke()
    ctx.setFillStyle('#8E8CD8')
    ctx.beginPath()
    ctx.moveTo(33, 14)
    ctx.lineTo(55, 14)
    ctx.lineTo(48, 2)
    ctx.lineTo(33, 14)
    ctx.closePath()
    ctx.fill()


    // 圆形
    ctx.setStrokeStyle('#ffffff')
    ctx.setLineWidth(2)
    ctx.beginPath()
    ctx.arc(200, 15, 10, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.stroke()

    ctx.setFillStyle('#ffe2b0')
    ctx.beginPath()
    ctx.arc(210, 85, 7, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()

    ctx.setStrokeStyle('#ffffff')
    ctx.setLineWidth(2)
    ctx.beginPath()
    ctx.arc(215, 90, 10, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.stroke()

    ctx.setStrokeStyle('#ffffff')
    ctx.setLineWidth(2)
    ctx.beginPath()
    ctx.arc(30, 105, 12, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.stroke()

    ctx.setStrokeStyle('#ffffff')
    ctx.setLineWidth(2)
    ctx.beginPath()
    ctx.arc(55, 85, 5, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.stroke()

    ctx.setFillStyle('#ffe2b0')
    ctx.beginPath()
    ctx.arc(55, 85, 4, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()

    ctx.setFillStyle('#8E8CD8')
    ctx.beginPath()
    ctx.arc(40, 280, 6, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()

    ctx.setStrokeStyle('#ffffff')
    ctx.setLineWidth(2)
    ctx.beginPath()
    ctx.arc(55, 340, 7, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.stroke()

    ctx.setFillStyle('#8E8CD8')
    ctx.beginPath()
    ctx.arc(230, 240, 6, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()

    ctx.setStrokeStyle('#ffffff')
    ctx.setLineWidth(2)
    ctx.beginPath()
    ctx.arc(217, 230, 11, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.stroke()
    // 方形
    ctx.setFillStyle('#e0e0e0')
    ctx.fillRect(87, 185, 70, 70)
    
    ctx.setFillStyle('#76A7F0')
    ctx.fillRect(92, 190, 70, 70)

    ctx.setFillStyle('#ffe2b0')
    ctx.fillRect(60, 185, 12, 12)
    

    // 图片
    ctx.drawImage(wxacode ,92, 190, 65, 65)
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
      self.setData({
        resnames: res.result.result.data.map(item => item.name),
        resumes: res.result.result.data
      })
    })

    wx.getStorage({
      key: 'userdetail',
      success: res => {
        self.setData({
          detail: res.data
        })
      }
    })
    wx.getStorage({
      key: 'access_token',
      success: res => {
        self.setData({
          token: res.data
        })
      },
      fail: err => {
        console.log(err)
      }
    })
    let access_token = ''
    let date = ''
    if (Object.keys(self.data.token).length > 0) {
      access_token = self.data.token.access_token
      date = self.data.token.date
    }
    const newDate = + new Date()
    if (access_token && newDate - date > 2 * 60 * 60 * 1000 || !access_token) {
      wx.cloud.callFunction({
        name: 'accesstoken',
        data: {
          access_token
        }
      })
      .then((res) => {
        console.log(res)
        const base64 = wx.arrayBufferToBase64(res.result.wxacode)
        const access_token = res.result.access_token
        wx.setStorage({
          key:"wxacodeImgUrl",
          data: `data:image/png;base64,${base64}`
        })
        wx.setStorage({
          key:"access_token",
          data: {
            access_token,
            date: + new Date()
          }
        })
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