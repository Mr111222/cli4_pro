<template>
  <div class="box">
    <div class="left">
      <el-menu
        router
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!-- Element About project Tree form task -->
        <el-menu-item :index="item.path" v-for="item in menu" :key="item.index">
          <i class="el-icon-menu"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <router-view></router-view>
      <!-- <el-button @click="getWeather()">ajax1</el-button>

      <el-button @click="alertFn()">ALERT</el-button>
      <el-button @click="switchFn(10)">switchFn</el-button> -->
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
      // activeIndex: "",
      msg: 12,
      codeImg: "",
      //  Element About project Tree form task
      menu: [
        {
          index: 0,
          title: "About",
          path: "/about"
        },
        {
          index: 2,
          title: "Element",
          path: "/element"
        },
        {
          index: 3,
          title: "project",
          path: "/project"
        },
        {
          index: 4,
          title: "Tree",
          path: "/tree"
        },
        {
          index: 5,
          title: "form",
          path: "/form"
        },
        {
          index: 6,
          title: "Task",
          path: "/task"
        },
        {
          index: 7,
          title: "View",
          path: "/view"
        },
        {
          index: 8,
          title: "Table",
          path: "/table"
        },
        {
          index: 9,
          title: "Flow",
          path: "/flow"
        },
        {
          index: 10,
          title: "Topoloty",
          path: "/topoloty"
        },
        {
          index: 11,
          title: "Mysql",
          path: "/mysql"
        }
      ]
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
