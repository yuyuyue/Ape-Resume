// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '请输入您的姓名',
    pickInit: '请选择',
    age: '请输入您的年龄',
    wechat: '请输入您的微信号',
    phone: '请输入您的电话号码',
    email: '请输入您的邮箱',
    schoolname: '请填写学校名称',
    startInit: '请选择',
    endInit: '请选择',
    education: '大专/本科',
    major: '请填写所学专业',
    expectjob: '请填写期待工作类型',
    advantage: '请填写个人优势',
    sex: '',
    selectSex: [
      "男", "女"
    ],
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sexIndex: e.detail.value,
      sex: this.data.selectSex[e.detail.value],
      pickInit: ''
    })
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
  addBasicInfo(e) {
    // console.log(e);
    const data = e.detail.value;
    data.sex = this.data.selectSex[this.data.sexIndex]
    data.startDate = this.data.startDate;
    data.endDate = this.data.endDate;
    console.log(data);
    
    wx.cloud.callFunction({
      name: "userdetail",
      data: {
        opt: 'add',
        data
      },
      success: res => {
      console.log(res);
        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }
      },
    })

  },
  picked(e) {
    console.log(e.item);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = {}
    wx.cloud.callFunction({
       name: "userdetail",
         data: {
           opt: 'selectById',
           data
         },
         success: res => {
           console.log(res);
           let queryData = res.result.result.data[0];
           if (res.result.result.data.length) {
             this.setData({
               ...queryData,
               pickInit: '',
               startInit: '',
               endInit: ''
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