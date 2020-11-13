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
    path: "/tree",
    name: "Tree",
    component: () => import(/* webpackChunkName: "tree" */ "../views/tree.vue"),
    meta: {
      title: "Tree"
    }
  },
  {
    path: "/form",
    name: "Form",
    component: () => import(/* webpackChunkName: "form" */ "../views/form.vue"),
    meta: {
      title: "Form"
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
    path: "/project",
    name: "Project",
    component: () =>
      import(/* webpackChunkName: "project" */ "../views/project.vue"),
    meta: {
      title: "Element"
    }
  },
  {
    path: "/test1",
    name: "T1",
    component: () =>
      import(/* webpackChunkName: "test1" */ "../views/test/test1.vue"),
    meta: {
      title: "test1"
    }
  },
  {
    path: "/test2",
    name: "T2",
    component: () =>
      import(/* webpackChunkName: "test2" */ "../views/test/test2.vue"),
    meta: {
      title: "test2"
    }
  },
  {
    path: "/test3",
    name: "T3",
    component: () =>
      import(/* webpackChunkName: "test3" */ "../views/test/test3.vue"),
    meta: {
      title: "test3"
    }
  },
  {
    path: "/test4",
    name: "T4",
    component: () =>
      import(/* webpackChunkName: "test4" */ "../views/test/test4.vue"),
    meta: {
      title: "test4"
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
