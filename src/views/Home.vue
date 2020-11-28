<!--
 * @Author: your name
 * @Date: 2020-10-11 20:57:26
 * @LastEditTime: 2020-11-28 21:18:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\src\views\Home.vue
-->
<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <router-link to="/element">Element</router-link>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <router-link to="/about">About</router-link>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <router-link to="/table">Table</router-link>
    <router-link to="/project">project</router-link>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <router-link to="/tree">Tree</router-link>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <router-link to="/form">form</router-link>
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
