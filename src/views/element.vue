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
      <<<<<<< HEAD
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
          <template slot-scope="scope">
            <el-tooltip
              :disabled="scope.row.address ? false : true"
              :content="scope.row.address"
              placemment="left-start"
              effect="light"
            >
              <el-input v-model="scope.row.address"></el-input>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
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
      codeImg: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: null
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    getLength(val) {
      return val ? val : true;
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
