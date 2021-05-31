<!--
 * @Author: your name
 * @Date: 2021-03-17 21:27:06
 * @LastEditTime: 2021-05-31 21:27:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\src\views\About.vue
-->
<template>
  <div class="main">
    <div style="width:500px; height:500px; overflow:auto;">
      <el-button @click="getNodeData">getNodeData</el-button>
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

      style: {}
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
