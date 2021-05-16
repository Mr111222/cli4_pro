参考链接：

https://blog.csdn.net/weixin_30693683/article/details/96537057?utm_medium=distribute.pc_relevant_bbs_down.none-task-blog-baidujs-1.nonecase&depth_1-utm_source=distribute.pc_relevant_bbs_down.none-task-blog-baidujs-1.nonecase



// 父页面向内嵌的页面发送数据

parent.vue（事件所在的页面）

<template>

  <iframe ref="iframeDom" href='' ></iframe>

</template> 



mounted () {

  this.iframeWin = this.$refs.iframeDom.contentWindow;

},

methods: {

  changeMenu (item) {

     this.iframeWin.postMessage(item,"*")

  }

}



// child.vue(嵌入的vue工程接收传递的参数， 文件自定义)

  mounted() {

  // 箭头函数防止this问题

    window.addEventListener('message', ev => {

      if (ev.source !== window.parent) return

      const data = ev.data

      if (data.path && data.path.length > 0) {

        this.$router.push({ path: `/systemManagement/${data.path}` })

      }

    }, false)

  },



  // 内嵌页面向父级页面发送数据

  methods: {

    xxx() {

      let obj = {

        num: Math.random()

      }

      window.parent.postMessage({ name: 9999999 }, '*')

    }

  }





//  父页面接收子页面（iframe 嵌入的页面）

App.vue 在这个文件接收即可，在主路口接收这个参数

 mounted () {

    window.addEventListener('message', ev =>{

  // 增加判断，存储数据到vuex中防止多次执行

      if(ev.data.hasOwnProperty('type') && ev.data.hasOwnProperty('data') && !ev.data.data)  return

      else this.$store.commit("login/ISNULL", ev.data);

    })

  },
