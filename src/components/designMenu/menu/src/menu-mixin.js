/*
 * @Author: your name
 * @Date: 2021-05-09 17:43:20
 * @LastEditTime: 2021-05-09 20:35:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\src\components\table\menu\src\menu-mixin.js
 */
export default {
  inject: ["rootMenu"],
  computed: {
    indexPath() {
      const path = [this.index];
      let parent = this.$parent;
      while (parent.$options.componentName !== "ZzMenu") {
        if (parent.index) {
          path.unshift(parent.index);
        }
        parent = parent.$parent;
      }
      return path;
    },
    parentMenu() {
      let parent = this.$parent;
      while (
        parent &&
        ["ZzMenu", "ZzSubmenu"].indexOf(parent.$options.componentName) === -1
      ) {
        parent = parent.$parent;
      }
      return parent;
    },
    paddingStyle() {
      if (this.rootMenu.mode !== "vertical") return {};
      let padding = 0;
      let parent = this.$parent;

      if (this.rootMenu.collapse) {
        padding = 20;
      } else {
        while (parent && parent.$options.componentName !== "ZzMenu") {
          if (parent.$options.componentName === "ZzSubmenu") {
            padding += 20;
          }
          parent = parent.$parent;
        }
      }
      return { paddingLeft: padding + "px" };
    }
  }
};
