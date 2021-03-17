/*
 * @Author: your name
 * @Date: 2021-03-03 20:44:13
 * @LastEditTime: 2021-03-03 20:45:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\src\store\modules\language.js
 */

const state = {
  lang: localStorage.getItem("lang") || "en"
};

const mutations = {
  switchLanguage: (state, lang) => {
    state.lang = lang;
    window.app.__vue__.$i18n.locale = lang;
    localStorage.setItem("lang", lang);
  }
};
export default {
  state,
  mutations
};
