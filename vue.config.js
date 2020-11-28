const path = require("path");
const { HashedModuleIdsPlugin } = require("webpack");
const isProduction = process.env.NODE_ENV === "production";
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false, // 关闭eslint
  productionSourceMap: false,
  publicPath: "./",
  outputDir: process.env.outputDir, // 生成文件的目录名称
  devServer: {
    open: true, // 自动启动浏览器
    https: false,
    hotOnly: false, // 热更新
    proxy: {
      "^/api": {
        target: "http://wthrcdn.etouch.cn/weather_mini", // 重写路径
        ws: true, //开启WebSocket
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
        // this.$http.requstGetApi('/api',{city: '北京'})
      }
    }
  },
  configureWebpack: config => {
    config.resolve = {
      extensions: [".js", ".vue", ".json", ".css"],
      alias: {
        vue$: "vue/dist/vue.esm.js",
        "@": resolve("src")
      }
    };
    config.plugins.push(new HashedModuleIdsPlugin());
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      // .set("@img", resolve("src/assets/images"))
      .set("@css", resolve("src/assets/css"));
    if (isProduction) {
      // 图片压缩
      config.module
        .rule("images")
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use("image-webpack-loader")
        .loader("image-webpack-loader")
        .options({ bypassOnDebug: true });
      // 删除预加载
      config.plugins.delete("preload");
      config.plugins.delete("prefetch");
      // 压缩代码
      config.optimization.minimize(true);
      // 分割代码
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          commons: {
            chunks: "initial",
            minChunks: 2,
            name: "commons",
            maxInitialRequests: 5,
            minSize: 0
          },
          commonUi: {
            test: module => {
              return /element-ui|ant-design-vue|jquery/.test(module.context);
            },
            chunks: "initial",
            name: "commonUi",
            priority: 10
          },
          commonUtil: {
            test: module => {
              return /axios|echarts|moment/.test(module.context);
            },
            chunks: "initial",
            name: "commonUtil",
            priority: 10
          }
        }
      });
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/assets/css/common.scss';`
      }
      // postcss: {
      //   plugins: [
      //     require("autoprefixer")({
      //       // 配置使用 autoprefixer
      //       overrideBrowserslist: ["last 15 versions"]
      //     }),
      //     require("postcss-pxtorem")({
      //       rootValue: 75, // 换算的基数
      //       // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。目前我使用 selectorBlackList字段，来过滤
      //       //如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
      //       selectorBlackList: ["el"],
      //       propList: ["*"],
      //       exclude: /node_modules/
      //     })
      //   ]
      // }
    }
  }
};
