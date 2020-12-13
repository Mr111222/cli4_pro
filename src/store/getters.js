/*
 * @Author: your name
 * @Date: 2020-12-13 15:15:56
 * @LastEditTime: 2020-12-13 15:25:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\src\store\getters.js
 */

// 多模块vuex 处理
const getters = {
  login: state => state.login.loginData,
  logmsg: state => state.login.message
};
export default getters;
