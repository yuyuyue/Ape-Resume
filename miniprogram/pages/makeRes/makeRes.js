// miniprogram/pages/makeRes/makeRes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   workList: [
      // { id: 1, name: 1, company: "爱奇艺", checked: false },
      // { id: 2, name: 2, company: "阿里巴巴", checked: false },
      // { id: 3, name: 3, company: "腾讯", checked: false },
      // { id: 4, name: 4, company: "丁香园", checked: false },
    ],
    selectall: false,
    itemList: [
      // { id: 1, name: 1, company: "旅行小账本", checked: false },
      // { id: 2, name: 2, company: "有赞精选", checked: false },
      // { id: 3, name: 3, company: "gihub", checked: false },
      // { id: 4, name: 4, company: "二维火点餐", checked: false },
    ],
    selectitemall: false
  },
  select: function (e) {
    let selectValue = e.currentTarget.dataset.name
    let index = e.currentTarget.dataset.index;
    let workList = this.data.workList
    let newli = 'workList[' + index + '].checked';
    this.setData({
      [newli]: !this.data.workList[index].checked
    })
  },
  //全选，取消全选
  selectAll: function (e) {
    let workList = this.data.workList;
    let selectall = this.data.selectall;
    if (selectall == false) {
      for (let i = 0; i < workList.length; i++) {
        let newli = 'workList[' + i + '].checked';
        this.setData({
          [newli]: true,
          selectall: true
        })
      }
    } else {
      for (let i = 0; i < workList.length; i++) {
        let newli = 'workList[' + i + '].checked';
        this.setData({
          [newli]: false,
          selectall: false
        })
      }
    }
  },
  // 项目选择
  selectItem: function (e) {
    let selectValue = e.currentTarget.dataset.name
    let index = e.currentTarget.dataset.index;
    let itemList = this.data.itemList
    let newli = 'itemList[' + index + '].checked';
    this.setData({
      [newli]: !this.data.itemList[index].checked
    })
  },
  selectItemAll: function (e) {
    let itemList = this.data.itemList;
    let selectitemall = this.data.selectitemall;
    if (selectitemall == false) {
      for (let i = 0; i <itemList.length; i++) {
        let newli = 'itemList[' + i + '].checked';
        this.setData({
          [newli]: true,
          selectitemall: true
        })
      }
    } else {
      for (let i = 0; i <itemList.length; i++) {
        let newli = 'itemList[' + i + '].checked';
        this.setData({
          [newli]: false,
          selectitemall: false
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = {};
     wx.cloud.callFunction({
       name:'project',
       data: {
         opt: 'selectAll',
         data
       },
       success: res => {
         console.log(res);
         let itemList = res.result.result.data;
         console.log(itemList);

         if (res.result.result.data.length) {
           this.setData({
             itemList
           })
         }

       }
     })
     wx.cloud.callFunction({
       name: 'expe',
       data: {
         opt: 'selectAll',
         data
       },
       success: res => {
         console.log(res);
         let workList = res.result.result.data;
         console.log(workList);

         if (res.result.result.data.length) {
           this.setData({
             workList
           })
         }

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