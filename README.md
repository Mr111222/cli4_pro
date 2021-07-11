<!--
 * @Author: your name
 * @Date: 2020-10-04 22:46:42
 * @LastEditors: zz
 * @Description: In User Settings Edit
 * @FilePath: \project-three\README.md
-->

# project-three

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

###

简单配置脚手架开发

### 富文本编辑器

https://blog.csdn.net/weixin_43650973/article/details/99435766

### vue html 模板

https://blog.csdn.net/lanseguhui/article/details/103520190

### workflow

http://www.feeldesignstudio.com/vue-flowchart-editor/demo/

### vuex 多模块化

参考 store 文件夹

### 启动 node 服务 nodemon server.js

连接 mysql.........

### DIY 游戏机

小风机，24V 电源，LED Controller

### 适配

https://blog.csdn.net/qq_43156398/article/details/102785370

### koa server

### 介绍

1.Login.vue
通过/api/login 接口返回 token， 接口数据为 Math.random()\_本地计算机时间的拼接,refreshToken 也是一直，可根据自己的实际业务进行调整. 2.接口数据通过 localStorage 进行本地存储 3.在 request.js 文件进行 token 时间获取，没请求接口一次，对比时间是否大于存入的时间，大于则调用 refreshToken()获取新的 token，并重新存储到本地，进行下次接口请求控制 4.使用场景， 长时间上传大文件，类似这种

#### codes

```
  const Koa = require('koa');
  const Router = require('koa-router');
  const cors = require('koa2-cors');
  const app = new Koa();
  const router = new Router();

  app.use(cors());
  // 数据自定义 json文件即可，测试请求接口的时间是否过期，过期则重新获取token
  const data = require('./data.json');


  // 延时函数，测试axios的timeout设置的时间超时控制
  async function delayer(time = 2000) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }


  // koa-route
  router.get('/api/getData', async (ctx, next) => {
    await delayer(1000);
    await next();
    ctx.body = data
  })

  router.post('/api/token', async (ctx) => {
    // console.log(ctx.request.fields, 999)
    ctx.body = {
        "code":0,
        "message":"操作成功！",
        "data": {
          "token": Math.random().toString().split('.')[1] +'_'+ new Date().getTime()
        }
    };
  })

  router.post('/api/refreshToken', async (ctx) => {
    // console.log(ctx.request.fields, 999)
    ctx.body = {
        "code":0,
        "message":"操作成功！",
        "data": {
          "token": Math.random().toString().split('.')[1] +'_'+ new Date().getTime()
        }
    };
  })

```
