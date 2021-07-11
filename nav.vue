<template>
  <div class="box">
    <div v-if="roleCode === 'tenant'" style="height:100%;">
      <div class="main_con">
        <div class="nemu">
          <el-menu
            style="height:100vh;float:left;overflow-y:auto;overflow-x:auto"
            class="el-menu-vertical-demo_portal"
            :collapse="isCollapse"
            text-color="#fff"
            :unique-opened="true"
          >
            <el-menu-item index="1" @click="openMenu">
              <i class="el-icon-s-unfold" v-if="isCollapse"></i>
              <span slot="title" v-if="!isCollapse">
                <img class="logo" src="@/assets/img/header-logo.png" alt=""/>
                <span
                  style="font-size:24px; padding-left:5px;padding-right: 20px; color:#fff;"
                  >PMFP</span
                ><i class="el-icon-close" @click="openMenu"></i
              ></span>
            </el-menu-item>
            <template>
              <menu-tree :menuData="dataMenu">
                <div slot="footer">
                  <div class="footer_user" v-if="isCollapse">
                    <el-menu-item index="5">
                      <i class="el-icon-user"></i>
                      <span slot="title">{{ username }}</span>
                    </el-menu-item>
                  </div>
                  <div class="footer_user footer_lang" v-if="isCollapse">
                    <el-menu-item index="6">
                      <i class="el-icon-eleme"></i>
                      <span slot="title">{{ lang }}</span>
                    </el-menu-item>
                  </div>
                  <div class="footer_user footer_basic" v-if="!isCollapse">
                    <el-menu-item index="7">
                      <i class="el-icon-user"></i>
                      <el-dropdown
                        class="avatar-container"
                        trigger="click"
                        placement="bottom"
                      >
                        <div class="avatar-wrapper">
                          <span class="user-avatar">{{ username }}</span>
                          <i class="el-icon-arrow-down" />
                        </div>
                        <el-dropdown-menu
                          slot="dropdown"
                          class="user-dropdown"
                          style="border:none;"
                        >
                          <el-dropdown-item divided @click.native="logout">
                            <span style="display:block;">注销</span>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                      <span
                        slot="title"
                        style="margin-left:10px; border-bottom: 1px solid red"
                        @click="changeLan"
                        >{{ lang }}</span
                      >
                    </el-menu-item>
                  </div>
                </div>
              </menu-tree>
            </template>
          </el-menu>
        </div>
        <div class="routers">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div v-else>
      <div :style="{ height: winHeight + 'px' }" class="main">
        <div class="main-header">
          <el-row
            type="flex"
            justify="space-around"
            align="middle"
            style="height:60px"
          >
            <el-col :span="4" style="height:30px">
              <div
                style="height:30px;width:100%;display:flex;align-items:center"
              >
                <img
                  style="height:30px"
                  src="../assets/img/header-logo-black.png"
                  alt
                />
                &nbsp;&nbsp;
                <b>PMFP Portal</b>
              </div>
            </el-col>
            <el-col :span="12" style="height:60px">
              <div class="header-tab">
                <el-menu
                  ref="mainMenu"
                  class="el-menu-demo"
                  @select="routeSelect"
                  :default-active="$route.matched[1].path"
                  router
                  mode="horizontal"
                  active-text-color="#1C69D4"
                  style="display:flex;justify-content:space-between;align-items:center;border:none;height:60px"
                >
                  <el-menu-item
                    v-for="(item, index) in menuList"
                    :key="index"
                    :index="item.name"
                    style="padding:0;height:60px;font-size:20px"
                    >{{ item.navItem }}</el-menu-item
                  >
                </el-menu>
              </div>
            </el-col>
            <el-col :span="5" style="height:60px">
              <ul style="float:right" class="logout">
                <li>
                  <span style="padding-right: 20px; font-weight:bold;">
                    <el-link type="danger" @click="getLog">{{ level }}</el-link>
                  </span>
                  <span>{{ username }} </span> &nbsp;&nbsp;&nbsp;&nbsp;<img
                    style="height:16px;cursor:pointer; vertical-align:top;"
                    src="../assets/img/icon-logout.png"
                    @click="logout"
                  />
                </li>
              </ul>
            </el-col>
          </el-row>
        </div>
        <div class="main-content">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
        <el-dialog
          title="更新内容"
          :visible.sync="logMsg"
          width="80%"
          custom-class="logBox"
        >
          <el-table :data="logData" border>
            <el-table-column label="更新内容" header-align="center">
              <template slot-scope="scope"
                ><span v-html="escapeStringHTML(scope.row.describe)"></span
              ></template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import MenuTree from "@/components/menu";
import { removeSession } from "@/utils/base";
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      // isCollapse: true,
      lang: "English",
      isLang: "en",
      dataMenu: [
        {
          id: "Service",
          name: "Service Store",
          icon: "el-icon-s-home",
          children: []
        },
        {
          id: "Guideline",
          name: "Technical Guideline",
          icon: "el-icon-s-data",
          children: []
        },
        {
          id: "Assets",
          name: "Architectural Assets",
          icon: "el-icon-s-shop",
          children: []
        }
      ],
      username: "",
      userCode: "",
      menuList: [],
      winHeight: document.documentElement.clientHeight,
      roleCode: "",
      logMsg: false,
      logData: [],
      activeNames: ["1"]
    };
  },
  components: {
    MenuTree
  },
  computed: {
    isCollapse() {
      return this.$store.getters.isHSowMune;
    },
    ...mapState(["winList"]),
    ...mapGetters(["level", "getNewLevel"])
  },
  watch: {
    roleCode: {
      handler: "routeindex",
      immediate: true
    },
    getNewLevel(oldval, newVal) {
      if (newVal > 0) {
        this.getLogData();
      }
    }
  },
  created() {
    this.$http({
      url: "portal/user/info",
      method: "get"
    }).then(res => {
      if (res.data.code == "000000") {
        this.username = res.data.data.userName;
        this.roleCode = res.data.data.roles[0].roleCode;
        this.$store.commit("setRoleCode", res.data.data.roles[0].roleCode);
      }
    });
  },
  mounted() {
    this.getMenuService();
    this.getAssets();
    this.getGuideline();
    this.winHeight = document.documentElement.clientHeight;
    window.onresize = () => {
      this.winHeight = document.documentElement.clientHeight;
    };
    this.getLogData();
  },
  methods: {
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      return str;
    },
    routeSelect() {},
    getLog() {
      this.logMsg = true;
      this.getLogData();
    },
    async getLogData() {
      let datas = await this.$http.get(`portal/releaseNote/query`);
      if (datas.data.code === "000000") {
        if (datas.data.data.length > 0) {
          let nowObj = datas.data.data.splice(0, 1);
          this.logData = nowObj;
          this.$store.commit("setLevel", nowObj[0].version);
        } else {
          this.logData = [];
          this.$store.commit("setLevel", "");
        }
      } else {
        this.$message({
          type: "error",
          message: datas.message
        });
      }
    },
    dropChange(backData) {
      this.username = backData;
    },
    logout() {
      // 关闭子工程
      for (let i = 0; i < this.winList.length; i++) {
        this.winList[i].close();
      }
      this.$store.commit("clearWinList");
      localStorage.clear();
      removeSession("breadList");
      this.clearAllCookie();
      this.$router.replace("/login");
    },
    // clear all cookie
    clearAllCookie() {
      let date = new Date();
      date.setTime(date.getTime() - 10000);
      // eslintno-useless-escape
      let keys = document.cookie.match(/[^ =;]+(?=\=)/g); // eslint-disable-line
      if (keys) {
        for (let i = keys.length; i--; )
          document.cookie =
            keys[i] + "=0; expire=" + date.toGMTString() + "; path=/";
      }
    },
    routeindex() {
      this.menuList = [];
      if (this.roleCode == "portal-admin") {
        this.menuList = [
          {
            name: "/sharedServiceAdmin",
            navItem: "Service Store"
          },
          {
            name: "/architecturalAssets",
            navItem: "Architectural Assets"
          },
          {
            name: "/technicalSpecifications",
            navItem: "Technical Guideline"
          },
          {
            name: "/projectmanage",
            navItem: "Project Management"
          }
        ];
      } else if (this.roleCode == "tenant") {
        this.menuList = [
          {
            name: "/sharedService",
            navItem: "Service Store"
          },
          {
            name: "/architecturalAssets",
            navItem: "Architectural Assets"
          },
          {
            name: "/technicalSpecifications",
            navItem: "Technical Guideline"
          }
        ];
      }
      this.roleCode == "portal-admin"
        ? this.$router.push("/sharedServiceAdmin")
        : this.roleCode == "tenant"
        ? this.$router.push("/sharedService")
        : "";
    },
    changeLan() {
      this.isLang = this.isLang === "en" ? "zn" : "en";
      this.lang = this.isLang === "en" ? "简体中文" : "English";
    },
    openMenu() {
      // this.$router.push('/sharedService')
      this.$store.commit("setNav", !this.isCollapse);
    },
    leveMenu() {
      this.$store.commit("setNav", !this.isCollapse);
    },
    getMenuService() {
      let children = [];
      this.$http.get(`portal/shared-service/query`).then(res => {
        if (res.data.code == "000000") {
          res.data.data.forEach(element => {
            if (element.online === 1) {
              element.isActive = false;
              children.push(element);
            }
          });
          this.dataMenu[0].children = this.setChildKey(children, "serve");
        }
      });
    },
    getAssets() {
      this.$http.get(`portal/assets/tree`).then(res => {
        if (res.data.code == "000000") {
          this.dataMenu[2].children = this.setChildKey(res.data.data, "Assets");
        }
      });
    },
    getGuideline() {
      this.$http.get(`portal/guideline/tree`).then(res => {
        if (res.data.code == "000000") {
          this.dataMenu[1].children = this.setChildKey(res.data.data, "Guide");
          // console.log(this.setChildKey(res.data.data, 'pps'))
        }
      });
    },
    setChildKey(data, api) {
      data.forEach(res => {
        if (res.children && res.children.length > 0) {
          this.setChildKey(res.children, api);
        } else {
          res.apiName = api;
        }
      });
      return data;
    }
  }
};
</script>

<style lang="scss">
.box {
  height: 100%;
}
.main_con {
  display: flex;
  height: 100%;
  overflow: hidden;
}

.nemu {
  float: left;
  height: 100%;
  position: relative;
  background: linear-gradient(352.67deg, #000428 0%, #004e92 115.68%);
  .el-menu {
    background: none;
  }
  .el-menu-vertical-demo_portal {
    height: 100%;
    color: #fff !important;
    .el-submenu__title:hover {
      background: none !important;
      color: #1366d7 !important;
    }
    .el-menu-item:hover {
      background: none !important;
      color: #1366d7 !important;
    }

    .logo {
      width: 40%;
    }

    .footer_user {
      .user-avatar {
        color: #fff;
        font-size: 18px;
      }
    }

    .footer_lang {
      bottom: 0;
      span {
        border-bottom: 1px solid red;
      }
    }
  }
}

.el-menu--vertical {
  background: linear-gradient(
    352.67deg,
    #000428 0%,
    #004e92 115.68%
  ) !important;
  .el-menu {
    background: none;
    .el-submenu__title:hover {
      background: none !important;
      color: #1366d7 !important;
    }
    .el-menu-item:hover {
      background: none !important;
      color: #1366d7 !important;
    }
  }
}

.routers {
  flex: 1;
  background: #f2f2f2;
  overflow-y: auto;
}

.el-menu-vertical-demo_portal:not(.el-menu--collapse) {
  width: 230px;
  min-height: 400px;
}

.el-icon-close {
  padding-left: 10px;
}

// admin-portal css
.main {
  width: 100%;
}

.main .main-header {
  height: 60px;
  width: 100%;
  background-color: #fff;
}

.main .main-content {
  width: 100%;
  height: calc(100% - 60px);
  background-image: url("../assets/img/home-banner-bg.png");
  background-size: 100% 46%;
  background-repeat: no-repeat;
  overflow: auto;
  padding: 30px 80px;
  box-sizing: border-box;
}

.main .el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #1c69d4;
}

.main .el-menu--horizontal > .el-menu-item {
  border-bottom: 2px solid #1c69d4;
}

.logout {
  margin: 0;
}

.logout li {
  height: 60px;
}

.logout li span {
  line-height: 60px;
}

.logout li img {
  margin-top: 22px;
}
.logBox .el-dialog__body {
  height: 300px;
  overflow: auto;
}
</style>
