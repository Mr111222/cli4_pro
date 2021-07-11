import Vue from "vue";
import Vuex from "vuex";
import persistedState from "vuex-persistedstate";
import login from "./modules/login";
import htmls from "@/data/content";
// zhi.zhou.ba@partner.bmw-brilliance.cn

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    errType: "错误",
    mask: false,
    loading: false,
    txt: htmls
  },
  mutations: {
    setMask(state, mask) {
      state.mask = mask;
    },
    setErrMsg(state, errMsg) {
      Vue.prototype.$alert(errMsg, state.errType);
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    clean(state) {
      state.loading = false;
      state.mask = false;
    }
  },
  actions: {},
  modules: {
    login
  },
  plugins: [persistedState({ storage: window.sessionStorage })]
});

export default store;
