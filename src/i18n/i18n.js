/*
 * @Author: your name
 * @Date: 2020-10-11 20:57:26
 * @LastEditTime: 2021-03-03 21:19:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\src\i18n\i18n.js
 */
import Vue from "vue";
import VueI18n from "vue-i18n";

import ElementLocale from "element-ui/lib/locale";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import zh from "./langs/zh";
import en from "./langs/en";
Vue.use(VueI18n);
const messages = {
  en: Object.assign(en, enLocale),
  zh: Object.assign(zh, zhLocale)
};
const i18n = new VueI18n({
  locale: localStorage.getItem("lang") || "en",
  messages
});

ElementLocale.i18n((key, value) => i18n.t(key, value)); // 为了实现element插件的多语言切换

export default i18n;
