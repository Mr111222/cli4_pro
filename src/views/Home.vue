<template>
  <div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div class="link">
      <router-link to="/element">Element</router-link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <router-link to="/about">About</router-link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <router-link to="/project">project</router-link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <router-link to="/tree">Tree</router-link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <router-link to="/form">form</router-link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <router-link to="/task">task</router-link>
    </div>
    <div style="margin-top: 40px; clear:both;">
      <el-select @change="setFont" v-model="fonts">
        <el-option v-for="item in fontList" :label="item.label" :value="item.value"></el-option>
    </el-select>
        <div class="home" :style="style">Welcome to Your Vue.js App</div>
        <div>在线字体下载地址:https://www.dafont.com/</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data () {
    return {
      fonts: 'cute',
      val: '',
      fontList: [{label: 'Anger',value: 'anger'},{label: 'Day',value: 'day'},{label: 'Infe',value: 'infe'},{label: 'Wra',value: 'wra'},{label: 'Cute',value: 'cute'},{label: 'Days', value: 'days'}],
      style: {}
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    setFont (val) {
      this.val = val
      this.style = {
        fontFamily: val,
        color:`#${Math.random().toString().substring(0,9)*1000000}`
      }
    }
  },
  watch: {
    fonts (old, newVal) {
      if(old !== newVal) {
        this.style = {
          fontFamily: this.val,
          color:`#${Math.random().toString().substring(0,9)*1000000}`
        } 
      }
      
    }
  }
};
</script>
<style lang="scss">
  .link {
    margin-top:40px;
  }
  .home {
    font-size: 30px;
  }
</style>