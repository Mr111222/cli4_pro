/*
 * @Author: your name
 * @Date: 2020-10-11 20:57:26
 * @LastEditTime: 2021-03-03 21:16:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import locale from "element-ui/lib/locale/lang/zh-CN"; // lang i18n
import "./plugins/element.js";
import "../src/assets/css/reset.css";
import http from "./http/request";

import ElementUI from "element-ui";

import { localData, sessionData } from "@/utils";
import i18n from "./i18n/i18n";
Vue.prototype.$http = http;
Vue.prototype.localData = localData;
Vue.prototype.sessionData = sessionData;
Vue.config.productionTip = false;

import "xe-utils";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";

import echarts from "echarts";
Vue.prototype.$echarts = echarts;

Vue.use(ElementUI, { locale });

Vue.use(VXETable);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
