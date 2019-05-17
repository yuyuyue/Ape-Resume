// components/select-box/select-box.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    show:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData:['男','女'],//下拉列表的数据
    index:0//选择的下拉列表下标
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectTap() {
      this.setData({
        show: !this.data.show
      });
    },
    optionTap(e) {
      let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      this.setData({
        index: Index,
        show: !this.data.show
      });
    },
  }
})
