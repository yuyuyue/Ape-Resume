// components/test-card/test-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardData: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    isSearch: false,
    inputValue: '',
    opt: '',
    url: '',
    toggle: false,
    toggleImage: '../../images/down-arrow.svg'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    search(event) {
      if (!this.data.inputValue) {
        return
      }
      this.setData({
        isSearch: true,
      })
      switch (event.currentTarget.dataset.search) {
        case 'github': {
          this.setData({
            url: `https://github.com/users/${this.data.inputValue}/contributions`,
            opt: 'gitContributions'
          })
          break
        }
        case 'juejin': {
          this.setData({
            url: `https://juejin.im/search?query=${this.data.inputValue}&type=all`,
            opt: 'juejin'
          })
          break
        }
        case 'leetcode': {
          this.setData({
            url: `https://leetcode-cn.com/u/${this.data.inputValue}`,
            opt: 'leetcode'
          })
          break
        }
        case 'leetcodeE': {
          break
        }
        case 'niuke': {
          break
        }
      }
      var result = []
      wx.cloud.callFunction({
        name: 'search',
        data: {
          opt: this.data.opt,
          url: this.data.url
        },
        success: (res) =>{
          result = res.result.result
          if (this.data.opt === 'gitContributions') {
            wx.request({
              url: `https://api.github.com/users/${this.data.inputValue}/repos`,
              header: {
                'content-type': 'application/json'
              },
              success: (res) => {
                console.log(res)
                let watch = 0
                let star = 0
                let fork = 0
                for (let key of res.data) {
                  watch += key.watchers
                  star += key.stargazers_count 
                  fork += key.forks
                }
                result.unshift(watch)
                result.unshift(fork)
                result.unshift(star)
                let data = {
                  name: this.properties.cardData.name,
                  num: result
                }
                this.triggerEvent('searched', data)
                this.toggle()
              },
              fail: (err) => {
                console.log(err)
              }
            })
          } else {
            let data = {
              name: this.properties.cardData.name,
              num: result
            }
            this.triggerEvent('searched', data)
            this.toggle()
          }
          
        },
        fail: (err) => {
          console.log(err)
        }
      })
      const time = new Promise((resovle, reject) => {
        setTimeout(()=>{
          resovle('ok')
        }, 1000)
      }) 
      time.then(() => {
        this.setData({
          isSearch: false
        })
      })
    },
    getInput(event) {
      const inputValue = encodeURI(event.detail.value)
      this.setData({
        inputValue
      })
    },
    toggle() {
      let toggle = !this.data.toggle
      if (toggle) {
        this.setData({
          toggle,
          toggleImage: '../../images/up-arrow.svg'
        })
      } else {
        this.setData({
          toggle,
          toggleImage: '../../images/down-arrow.svg'
        })
      }
      
    }
  }
})
