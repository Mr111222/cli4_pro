/*
 * @Author: your name
 * @Date: 2021-05-09 17:43:19
 * @LastEditTime: 2021-05-09 17:49:08
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\src\components\table\menu-item\index.js
 */
import ZzMenuItem from "../menu/src/menu-item";

/* istanbul ignore next */
ZzMenuItem.install = function(Vue) {
  Vue.component(ZzMenuItem.name, ZzMenuItem);
};

export default ZzMenuItem;
