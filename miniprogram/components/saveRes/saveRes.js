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
    resumeName:''
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
    carNum(e){
      this.setData({
        resumeName: e.detail.value
      })
      
    },
    saveBtn(){
      
      this.setData({
        showDialog:false
      })
      this.triggerEvent('save', {
        resumeName:this.data.resumeName
      })
    }
  }
})
