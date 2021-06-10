<!--
 * @Author: your name
 * @Date: 2021-03-17 21:27:06
 * @LastEditTime: 2021-06-07 22:30:43
 * @LastEditors: zz
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\src\views\About.vue
-->
<template>
  <div class="main">
    <div style="width:500px; height:500px; overflow:auto;">
      <el-button @click="getNodeData">getNodeData</el-button>
      <el-upload class="upload-demo" action="#" :on-change="handleChange">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
      <el-button
        style="margin-left: 10px;"
        size="small"
        type="success"
        @click="getWater"
        >上传到服务器</el-button
      >
    </div>
    <div>
      <el-select @change="setFont" v-model="fonts">
        <el-option
          v-for="(item, index) in fontList"
          :label="item.label"
          :value="item.value"
          :key="index"
        ></el-option>
      </el-select>

      <p :style="style">456465asdasd</p>
    </div>
    <div
      class="box"
      v-for="(item, index) in list"
      :key="index"
      @mouseenter="setHover(item)"
      @mouseleave="cancelHover(item)"
    >
      <div>{{ item.name }}</div>
      <div class="box_hover">
        hovers........
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isHover: false,
      list: [
        { isHover: false, name: "pps1" },
        { isHover: false, name: "pps2" },
        { isHover: false, name: "pps3" },
        { isHover: false, name: "pps4" },
        { isHover: false, name: "pps5" },
        { isHover: false, name: "pps6" },
        { isHover: false, name: "pps7" }
      ],
      fonts: "",

      fontList: [
        { label: "Anger", value: "anger" },

        { label: "Day", value: "day" },

        { label: "Infe", value: "infe" },

        { label: "Wra", value: "wra" },

        { label: "Cute", value: "cute" },

        { label: "Days", value: "days" },

        { label: "Source", value: "source" },

        { label: "SourceR", value: "source_r" },

        { label: "BMW", value: "BMW" }
      ],

      style: {},
      files: null
    };
  },
  watch: {
    fonts(old, newVal) {
      if (old !== newVal) {
        this.style = {
          fontFamily: this.val,
          color: `#ff012`
        };
      }
    }
  },
  methods: {
    async getWater() {
      const forms = new FormData();
      forms.append("file", this.files.raw);
      let datas = await axios({
        headers: {
          "Content-type": "multipart/form-data",
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbk5hbWUiOiJkZW1vMyIsInRlbmFudElkIjoiNDk3NjY5NjQ2MTU3OTI3MzUwOSIsInNvdXJjZSI6IkxPR0lOIiwiZXhwIjoxNjIzMTYxMzIzLCJ1c2VySWQiOiIxNzA0Nzk5ODgwNTcxMTcyNDQ1IiwidXNlcm5hbWUiOiJkZW1vMyJ9.Eq9A3yrPrP_SS_H-4dVsb7TYi7UB2GEcwN35AeqYlQo"
        },
        url: "/api/watermark/v1/watermark/image",
        method: "post",
        forms
      });
    },

    dataToFormData(oData) {
      const oFormData = new FormData();
      for (const [key, val] of Object.entries(oData)) {
        if (Array.isArray(val)) {
          for (const oneItem of val) oFormData.append(key, oneItem);
        } else {
          oFormData.append(key, val);
        }
      }
      return oFormData;
    },
    handleChange(file, fileList) {
      this.files = file;
      console.log(file, 999);
      // this.fileList = fileList.slice(-3);
    },
    async getNodeData() {
      let datas = await this.$http.requstGetApi("/v2");
      console.log(datas, 999);
    },
    setHover(item) {
      item.isHover = true;
    },
    cancelHover(item) {
      item.isHover = false;
    },
    setFont(val) {
      this.val = val;
    }
  }
};
</script>
<style scoped lang="scss">
.main {
  display: flex;
  flex-wrap: wrap;
  .box {
    flex: 0 0 22.5%;
    margin: 1%;
    height: 100px;
    background: pink;
    text-align: center;
    line-height: 100px;
    position: relative;
    &:hover {
      .box_hover {
        height: 220px;
      }
    }
    .box_hover {
      position: absolute;
      width: 100%;
      transition: height 0.5s ease;
      height: 0;
      top: 0%;
      overflow: hidden;
      background: red;
      z-index: 999;
    }
  }
}
</style>
