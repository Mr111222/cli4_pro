<!--
 * @Author: your name
 * @Date: 2021-05-09 17:43:19
 * @LastEditTime: 2021-05-09 20:26:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\src\components\table\menu\src\menu-item-group.vue
-->
<template>
  <li class="zz-menu-item-group">
    <div
      class="zz-menu-item-group__title"
      :style="{ paddingLeft: levelPadding + 'px' }"
    >
      <template v-if="!$slots.title">{{ title }}</template>
      <slot v-else name="title"></slot>
    </div>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>
<script>
export default {
  name: "ZzMenuItemGroup",

  componentName: "ZzMenuItemGroup",

  inject: ["rootMenu"],
  props: {
    title: {
      type: String
    }
  },
  data() {
    return {
      // paddingLeft: 20
    };
  },
  computed: {
    levelPadding() {
      let padding = 0;
      let parent = this.$parent;
      if (this.rootMenu.collapse) return 0;
      while (parent && parent.$options.componentName !== "ZzMenu") {
        if (parent.$options.componentName === "ZzSubmenu") {
          padding += 0;
        }
        parent = parent.$parent;
      }
      return padding;
    }
  }
};
</script>
