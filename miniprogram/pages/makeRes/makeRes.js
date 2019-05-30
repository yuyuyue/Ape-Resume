// miniprogram/pages/makeRes/makeRes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workList:[],
    apeList:[],
    selectall: false,
    selectitemall: false,
    
    selected: {
      works: [], 
      items: [],
     
    }
  },
  select: function (e) {
    let selectValue = e.currentTarget.dataset.name
    let index = e.currentTarget.dataset.index;

    let newli = 'workList[' + index + '].checked';
    this.setData({
      [newli]: !this.data.workList[index].checked
    })
    this.setData({
      ['selected.works']: this.data.workList.filter(item => item.checked)
    })
    if (this.data.workList.every(item => item.checked)) {
      this.setData({
        selectall: true
      })
    }
    else {
      this.setData({
        selectall: false
      })
    }

  },
  //实习经验 全选，取消全选
  selectAll: function (e) {
    let workList = this.data.workList;
    let selectall = this.data.selectall;
    if (selectall == false) {
      for (let i = 0; i < workList.length; i++) {
        let newli = 'workList[' + i + '].checked';
        this.setData({
          [newli]: true,
          selectall: true,
          ['selected.works']: this.data.workList
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
    this.setData({
      ['selected.items']: this.data.itemList.filter(item => item.checked)
    })
    if (this.data.itemList.every(item => item.checked)) {
      this.setData({
        selectitemall: true
      })
    }
    else {
      this.setData({
        selectitemall: false
      })
    }
  },
  selectItemAll: function (e) {
    let itemList = this.data.itemList;
    let selectitemall = this.data.selectitemall;
    if (selectitemall == false) {
      for (let i = 0; i < itemList.length; i++) {
        let newli = 'itemList[' + i + '].checked';
        this.setData({
          [newli]: true,
          selectitemall: true,
          ['selected.items']: this.data.itemList
        })
      }
    } else {
      for (let i = 0; i < itemList.length; i++) {
        let newli = 'itemList[' + i + '].checked';
        this.setData({
          [newli]: false,
          selectitemall: false
        })
      }
    }
  },
  
  // 点击下一步跳转到选择模板页
  chooseTempHandle() {
    wx.setStorage({
      key: 'selected',
      data: this.data.selected
    })
    wx.navigateTo({
      url: `../chooseRes/chooseRes`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = {};
    wx.cloud.callFunction({
      name: 'project',
      data: {
        opt: 'selectAll',
        data
      },
      success: res => {
        console.log(res);
        let itemList = res.result.result.data;
        // console.log(itemList);
        itemList.map((item, index) => {
          return item.id = index + 1
        })
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
        workList.map((item, index) => {
          return item.id = index + 1
        })
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