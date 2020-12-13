/*
 * @Author: your name
 * @Date: 2020-10-11 20:57:26
 * @LastEditTime: 2020-12-13 15:22:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\src\store\modules\login.js
 */
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const ALERT = "ALERT";
const MESSAGE = "MESSAGE";

const state = {
  loginData: {
    rem: false,
    autoVal: false
  },
  message: "zz"
};
const getters = {};

const actions = {};

const mutations = {
  [LOGIN](state, loginData) {
    state.loginData = loginData;
    window.sessionStorage.setItem("userid", loginData.id);
    window.sessionStorage.setItem("username", loginData.username);
    window.sessionStorage.setItem("nickname", loginData.nickname);
    window.sessionStorage.setItem("token", loginData.token);
    window.sessionStorage.setItem("role", loginData.role);
  },
  [LOGOUT](state) {
    state.loginData = {};
    window.sessionStorage.removeItem("userid");
    window.sessionStorage.removeItem("username");
    window.sessionStorage.removeItem("nickname");
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("role");
  },
  [ALERT](state, msg) {
    alert(msg);
  },
  [MESSAGE](state, msg) {
    state.message = msg;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
