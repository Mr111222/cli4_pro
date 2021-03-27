<template>
  <div class="main">
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
      ]
    };
  },
  methods: {
    setHover(item) {
      item.isHover = true;
    },
    cancelHover(item) {
      item.isHover = false;
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
