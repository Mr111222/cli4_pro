/*
 * @Author: your name
 * @Date: 2021-03-18 20:45:04
 * @LastEditTime: 2021-05-10 21:27:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "../src/assets/css/reset.css";
import "../src/assets/font/font.scss";
import http from "./http/request";

import { localData, sessionData } from "@/utils";
import i18n from "./i18n/i18n";
Vue.prototype.$http = http;
Vue.prototype.localData = localData;
Vue.prototype.sessionData = sessionData;
Vue.config.productionTip = false;

import "vx-easyui/dist/themes/default/easyui.css";
import "vx-easyui/dist/themes/icon.css";
import "vx-easyui/dist/themes/vue.css";
import EasyUI from "vx-easyui";
Vue.use(EasyUI);
import Watermark from "@/utils/water";

import ZkTable from "vue-table-with-tree-grid";
Vue.use(ZkTable);

// import MenuPro from "@/components/designMenu";
// import "@/components/designMenu/css/menu.scss";

// Vue.use(MenuPro);

import MenuPro from "@/components/elMenu";
// import "@/components/designMenu/css/menu.scss";

Vue.use(MenuPro);

import VerticalToggle from "@/components/toggle.js";
// Vue.component(VerticalToggle.name, VerticalToggle);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    Watermark.set("我是水印内容");
  }
}).$mount("#app");
