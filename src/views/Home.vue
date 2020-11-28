<!--
 * @Author: your name
 * @Date: 2020-10-11 20:57:26
 * @LastEditTime: 2020-11-27 22:09:52
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\src\views\Home.vue
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <router-link to="/element">Element</router-link>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <router-link to="/about">About</router-link>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <router-link to="/table">Table</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
