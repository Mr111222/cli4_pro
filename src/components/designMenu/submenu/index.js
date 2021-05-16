/*
 * @Author: your name
 * @Date: 2021-05-09 18:02:48
 * @LastEditTime: 2021-05-09 18:04:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\src\components\menu\submenu\index.js
 */
import ZzSubmenu from "../menu/src/submenu";

/* istanbul ignore next */
ZzSubmenu.install = function(Vue) {
  Vue.component(ZzSubmenu.name, ZzSubmenu);
};

export default ZzSubmenu;
