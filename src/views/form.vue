<template>
  <div class="box">
    <editor-bar
      v-model="detail"
      :isClear="isClear"
      @change="change"
    ></editor-bar>
  </div>
</template>

<script>
// import EditorBar from "../components/wangEnduit.vue";
import EditorBar from "../components";

export default {
  components: { EditorBar },
  data() {
    return {
      isClear: false,
      detail: ""
    };
  },
  methods: {
    change(val) {
      console.log(val);
    }
  }
};
</script>
<style>
  .box {
    width: 100%;
    height: 100%;
    overflow:auto;
  }
</style>