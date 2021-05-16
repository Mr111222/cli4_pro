### 关于收集window对象问题
``` javascript
methods: {
  toNewView (url) {
     let windowObj = null
     windowObj = window.open(urls)
     // vuex 存储，变为全局数据
     this.$store.commit('breadcrumb/pushWinArr', windowObj)
  }
}
```


### vuex 
``` javascript
const state = {
  winArr: []
}
const moutations = {
  pushWinArr (state, obj) {
    state.winArr.push(obj)
  },
  clearwinArr () {
     state.winArr.push(ojb)
  }
}

const getters = {
  getWinarr: state=>state.winArr
}
```

### logout 登出页面
``` javascript
  computed: {
    ...mapGetters(['getWinarr'])
  },
  methods:{
    logout () {
      if(this.getWinarr.length > 0) {
        for(let i=0; i<this.getWinarr.length; i++) {
          if(this.getWinarr(i)) this.getWinarr[i].close
        }
      }
       this.$store.commit('breadcrumb/clearWinArr)
    ]
  }
```
