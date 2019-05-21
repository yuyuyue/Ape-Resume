// miniprogram/pages/makeRes/makeRes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workExp:[
      {name: '阿里巴巴', value: '0',checked: true},
      {name: '网易云', value: '1'},
      {name: '腾讯', value: '2'},
    ],
    itemDesc: [
      {name: '旅行小账本', value: '0',checked: true},
      {name: '有赞商城', value: '1'},
      {name: '猿简历', value: '2'},
  ]
  },
  selectItem(e){
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var itemDesc = this.data.itemDesc, values = e.detail.value;
    for (var i = 0, lenI = itemDesc.length; i < lenI; ++i) {
        itemDesc[i].checked = false;

        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
            if(itemDesc[i].value == values[j]){
                itemDesc[i].checked = true;
                break;
            }
        }
    }
    this.setData({
        itemDesc: itemDesc
    });
  },
  selectWork(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var workExp = this.data.workExp, values = e.detail.value;
    for (var i = 0, lenI = workExp.length; i < lenI; ++i) {
        workExp[i].checked = false;

        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
            if(workExp[i].value == values[j]){
                workExp[i].checked = true;
                break;
            }
        }
    }

    this.setData({
        workExp: workExp
    });
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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