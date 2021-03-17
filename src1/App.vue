<template>
  <div id="app" v-loading="loading">
    <router-view />
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState(["loading", "errType", "errMsg"])
  },
  methods: {
    ...mapMutations(["setErrMsg"])
  }
};
</script>
<style>
#app {
  overflow: hidden;
  margin: 0;
  padding: 0;
}
</style>
