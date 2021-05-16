/*
 * @Author: your name
 * @Date: 2021-05-09 17:43:19
 * @LastEditTime: 2021-05-09 17:47:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\src\components\table\menu\index.js
 */
import ZzMenu from "./src/menu";

/* istanbul ignore next */
ZzMenu.install = function(Vue) {
  Vue.component(ZzMenu.name, ZzMenu);
};

export default ZzMenu;
