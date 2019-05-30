// miniprogram/pages/makeRes/makeRes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workList: [],
    itemList: [],
    apeList: [],
    selectall: false,
    selectitemall: false,
    selectapeall: false,
    selected: {
      works: [],
      items: [],
      apes: []
    },
    searchData: {},//第三方的缓存数据
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
    } else {
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
    } else {
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
  // 三方选择
  selectApes(e) {
    let selectValue = e.currentTarget.dataset.name
    let index = e.currentTarget.dataset.index;

    let newli = 'apeList[' + index + '].checked';
    this.setData({
      [newli]: !this.data.apeList[index].checked
    })
    this.setData({
      ['selected.apes']: this.data.apeList.filter(item => item.checked)
    })
    if (this.data.apeList.every(item => item.checked)) {
      this.setData({
        selectapeall: true
      })
    } else {
      this.setData({
        selectapeall: false
      })
    }
  },
  selectApesAll(e) {
    let apeList = this.data.apeList;
    let selectapeall = this.data.selectapeall;
    if (selectapeall == false) {
      for (let i = 0; i < apeList.length; i++) {
        let newli = 'apeList[' + i + '].checked';
        this.setData({
          [newli]: true,
          selectapeall: true,
          ['selected.apes']: this.data.apeList
        })
      }
    } else {
      for (let i = 0; i < apeList.length; i++) {
        let newli = 'apeList[' + i + '].checked';
        this.setData({
          [newli]: false,
          selectapeall: false
        })
      }
    }
  },
  // 点击下一步跳转到选择模板页
  chooseTempHandle() {
    const data = this.data.selected.apes
    const searchData = this.data.searchData
    let selected = this.data.selected
    let apes = {} 
    data.map((item) => {
      const name = item.name
      if (searchData[name]) {
        apes[name] = searchData[name]
      }
    })
    selected.apes = apes
    this.setData({
      selected
    })
    wx.setStorage({
      key: 'selected',
      data: this.data.selected
    })
    let url = `../chooseRes/chooseRes`;
    // if(this.data.not){
    //   url+='?not="true"'
    // }
   wx.navigateTo({
     url
   })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this
    if (options.not) {
      this.setData({
        not: true
      })
    }
    let data = {};
    wx.showLoading({
      title: '加载中'
    })

    Promise.all([
      wx.cloud.callFunction({
        name: 'project',
        data: {
          opt: 'selectAll',
          data
        },
        // success: res => {
        //   // console.log(res);
        //   let itemList = res.result.result.data;
        //   // console.log(itemList);
        //   itemList.map((item, index) => {
        //     return item.id = index + 1
        //   })
        //   if (res.result.result.data.length) {
        //     this.setData({
        //       itemList
        //     })
        //   }

        // }
      }),
      wx.cloud.callFunction({
        name: 'expe',
        data: {
          opt: 'selectAll',
          data
        },
        // success: res => {
        //   // console.log(res);
        //   let workList = res.result.result.data;
        //   // console.log(workList);
        //   workList.map((item, index) => {
        //     return item.id = index + 1
        //   })
        //   if (res.result.result.data.length) {
        //     this.setData({
        //       workList
        //     })
        //   }

        // }
      }),
     
    ]).then(values => {
      let itemList = values[0].result.result.data;
      // console.log(itemList);
      itemList.map((item, index) => {
        return item.id = index + 1
      })
      if (itemList.length) {
        this.setData({
          itemList
        })
      }
      let workList = values[1].result.result.data;
      // console.log(workList);
      workList.map((item, index) => {
        return item.id = index + 1
      })
      // console.log(workList)
      if (workList.length) {
        this.setData({
          workList
        })
      }
      wx.getStorage({
        key: 'searchData',
        success: (res) => {
          self.setData({
            searchData: res.data
          })
          const names = Object.keys(res.data)
          const apeList = names.map((item, index) => {
            return {
              id: index + 1,
              name: item
            }
          })
          // console.log(apeList)
          if (apeList.length) {
            self.setData({
              apeList
            })
          }
        },
        fail: (err) => {
          console.log(err)
        }
      })
    })
    wx.hideLoading()

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