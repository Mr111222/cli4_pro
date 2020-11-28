/*
 * @Author: your name
 * @Date: 2020-10-11 20:57:26
 * @LastEditTime: 2020-11-27 22:10:17
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登陆",
      nouser: true // 不需要登录
    },
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    meta: {
      title: "Home"
    }
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      title: "About"
    }
  },
  {
    path: "/element",
    name: "Ele",
    component: () =>
      import(/* webpackChunkName: "element" */ "../views/element.vue"),
    meta: {
      title: "Element"
    }
  },
  {
    path: "/table",
    name: "Tab",
    component: () =>
      import(/* webpackChunkName: "element" */ "../views/table.vue"),
    meta: {
      title: "Table"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach(async (to, from, next) => {
  const token = sessionStorage.getItem("token");
  if (token === null) {
    if (to.meta.nouser) {
      store.commit("clean"); // 进入新页面，清除上个页面的页面状态(error,loading等)
      document.title = to.meta.title;
      next();
    } else {
      store.commit("login/LOGOUT"); // 意思为login模块的LOGOUT, login/LOGOUT
      next({ name: "login", replace: true });
    }
  } else {
    store.commit("clean");
    if (to.fullPath === "/login") next({ name: "home", replace: true });
    else {
      if (to.meta && to.meta.title) document.title = to.meta.title;
      next();
    }
  }
});

export default router;
