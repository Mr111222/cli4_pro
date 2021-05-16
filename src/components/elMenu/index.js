/*
 * @Author: your name
 * @Date: 2021-05-09 17:56:37
 * @LastEditTime: 2021-05-09 18:17:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\src\components\table\index.js
 */

/* Automatically generated by './build/bin/build-entry.js' */

import Menu from "./menu/index.js";
import Submenu from "./submenu/index.js";
import MenuItem from "./menu-item/index.js";
import MenuItemGroup from "./menu-item-group/index.js";

const components = [Menu, Submenu, MenuItem, MenuItemGroup];

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  version: "2.15.1",
  install,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup
};
