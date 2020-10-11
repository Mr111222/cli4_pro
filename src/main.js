import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "../src/assets/css/reset.css";
import http from "./http/request";

import { localData, sessionData } from "@/utils";
import i18n from "./i18n/i18n";
Vue.prototype.$http = http;
Vue.prototype.localData = localData;
Vue.prototype.sessionData = sessionData;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
