<template>
  <div class="box">
    <div class="main1"></div>
    <div class="main2">
      <div class="con1"></div>
      <div class="con2"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  background: #c32145;
  display: flex;
  flex-flow: column;
  .main1 {
    height: 100px;
    background: #ccc;
  }
  .main2 {
    flex: 1;
    background: orange;
    display: flex;
    flex-flow: row;
    .con1 {
      width: 100px;
      background: lawngreen;
    }
    .con {
      flex: 1;
      background: lightgreen;
    }
  }
}
</style>
