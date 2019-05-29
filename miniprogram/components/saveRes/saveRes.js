// components/saveRes/saveRes.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showDialog:{
      type:Boolean,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close(){
      this.setData({
        showDialog:false
      })
    },
    saveBtn(){
      wx.showToast({
        title: '保存成功'
      })
      this.setData({
        showDialog:false
      })
    }
  }
})
