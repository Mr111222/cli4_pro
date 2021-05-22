<!--
 * @Author: your name
 * @Date: 2021-05-22 16:04:53
 * @LastEditTime: 2021-05-22 16:10:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\nginx.md
-->

```javascript
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const app = new Koa();
const router = new Router();

// 注意位置，放在请求之前
// app.use(cors({
// origin: function (ctx) {
// return 'http://localhost:8080'; // 只允许指定域名
// },
// methods:['GET','POST'],
// allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }))

const data = require('./data.json');
// 指定一个 url 匹配
router.get('/v2', async (ctx) => {
  ctx.body = {
    data: data,
  };
});

app.use(router.routes());
app.use(
  router.allowedMethods({
    // throw: true, // 抛出错误，代替设置响应头状态
    // notImplemented: () => '不支持当前请求所需要的功能',
    // methodNotAllowed: () => '不支持的请求方式'
  })
);

// 启动服务监听本地 3000 端口
app.listen(3000, () => {
  console.log('应用已经启动，http://localhost:3000');
});
```

### nginx

```bash

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

        location /v2{
            proxy_pass http://localhost:3000/v2; ## 这里为代理到koa 的服务接口
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

### Vue 使用

```javascript
 methods: {
    async getNodeData() {
      let datas = await this.$http.requstGetApi("/v2");
      console.log(datas, 999);
    },
 }
```

### 注意事项

1.本地调试建议使用 proxy 代理进行
2.nginx 代理可以用于线上，反向代理使用
3.vue build 之后，需要将 dist 文件夹放到 nginx-1.18.0\html 下，一般会在 vue 工程根目录创建 nginx.config 文件，进行文件 copy 文件，不在赘述
