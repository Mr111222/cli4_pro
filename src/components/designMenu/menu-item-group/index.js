/*
 * @Author: your name
 * @Date: 2021-05-09 17:43:19
 * @LastEditTime: 2021-05-09 17:48:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\src\components\table\menu-item-group\index.js
 */
import ZzMenuItemGroup from "../menu/src/menu-item-group";

/* istanbul ignore next */
ZzMenuItemGroup.install = function(Vue) {
  Vue.component(ZzMenuItemGroup.name, ZzMenuItemGroup);
};

export default ZzMenuItemGroup;
