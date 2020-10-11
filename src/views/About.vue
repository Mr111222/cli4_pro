<!--
 * @Author: your name
 * @Date: 2020-10-04 22:46:01
 * @LastEditTime: 2020-10-11 15:16:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editme
 * @FilePath: \project-three\src\views\About.vue
-->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button @click="setArr">setArr</el-button>
    <el-button @click="getArr">getArr</el-button>
    <el-button @click="delArr">delArr</el-button>
    <el-button type="primary">primary</el-button>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.sessionData("get", "token"), 888);
  },
  methods: {
    setArr() {
      this.sessionData("set", "list", [1, 2, 3, 4, 9, 5]);
    },
    getArr() {
      let s = this.sessionData("get", "list");
      console.log(JSON.parse(s));
    },
    delArr() {
      this.sessionData("clean", "list");
    }
  }
};
</script>
