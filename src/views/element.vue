<template>
  <div class="box">
    <div class="left">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航五</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航六</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航七</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航八</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航九</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航十</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <el-button @click="getWeather()">ajax1</el-button>

      <el-button @click="alertFn()">ALERT</el-button>
      <el-button @click="switchFn(10)">switchFn</el-button>
    </div>
  </div>
</template>
<style lang="scss">
.box {
  display: flex;
  width: 100%;
  height: calc(100vh);
  .left {
    width: 255px;
    background: $bgColor;
    overflow-y: auto;
  }
  .right {
    flex: 1;
    border: 1px solid #ccc;
  }
}
</style>
<script>
import axios from "axios";
export default {
  data() {
    return {
      msg: 12,
      codeImg: ""
    };
  },
  methods: {
    switchFn(num) {
      switch (num) {
        case num < 10:
          alert(num);
          break;
        default:
          alert("111111");
      }
    },
    alertFn() {
      this.$store.commit("login/ALERT", "我说测试数据");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    async handleClose(key, keyPath) {
      console.log(key, keyPath);
      let datas = await axios.get(`api`, { city: "北京" });
      console.log(datas);
    },
    async axiosGet() {
      let datas = await axios.get(`api`, { city: "北京" });
      console.log(datas);
    },
    async getWeather() {
      let datas = await this.$http.requstGetApi(`api`, { city: "北京" });
      console.log(datas, 9090);
    }
  }
};
</script>
