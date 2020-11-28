<template>
  <div class="login">
    <div class="bg"></div>
    <div class="login-form">
      <el-input v-model="loginData.username" placeholder="请输入用户名" />
      <el-input
        v-model="loginData.password"
        type="password"
        placeholder="请输入密码"
      />
      <el-input
        v-model="loginData.checkcode"
        maxlength="4"
        placeholder="请输入验证码"
        @focus="getCheckCode()"
        @keyup.enter.native="onSubmit(true)"
      >
        <el-button
          slot="append"
          class="checkcode"
          size="small"
          type="primary"
          @click="getCheckCode(true)"
          >获取验证码</el-button
        >
      </el-input>
      <br />
      <el-button class="login-btn" type="success" @click="onSubmit"
        >登录</el-button
      >
    </div>
  </div>
</template>
<script>
import { getRandom, setToken } from "@/utils";
export default {
  name: "login",
  data() {
    return {
      loginData: {
        username: "ppps",
        password: "adsda4564",
        checkcode: "1213"
      },
      codeStyle: {
        backgroundImage: "",
        color: ""
      }
    };
  },
  mounted() {
    this.loginData.checkcode = getRandom(4);
  },
  methods: {
    getCheckCode(refresh) {
      if (refresh) this.loginData.checkcode = getRandom(4);
    },
    onSubmit() {
      try {
        this.$message({
          message: `${this.$t("login.success")}`,
          type: "success",
          duration: 800
        });
        sessionStorage.setItem("token", setToken());
        this.$router.push("/home");
      } catch (e) {
        this.$alert(e.message, "提示");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 800px;
  height: 100%;
  margin: 0 auto;
  position: relative;
  &-form {
    position: absolute;
    right: 20px;
    top: 150px;
    width: 380px;
    height: 300px;
    z-index: 99;
    padding: 30px;
    background-color: #fff;
    display: block;
    border-radius: 5px;
    box-shadow: 0 0 6px color("cn", "瓜瓤红");
    ::v-deep.el-input {
      margin: 6px 0;
    }
  }
  .checkcode {
    width: 90px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border: none;
  }
  .login-btn {
    margin: 6px 0;
    width: 100%;
  }
  .other {
    text-align: right;
    a {
      font-size: 14px;
      color: gray;
      margin-left: 12px;
    }
  }
}
</style>
