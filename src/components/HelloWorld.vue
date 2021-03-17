<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
    <h3>Installed CLI Plugins</h3>
    <el-button type="danger" @click="closeFn">关闭</el-button>
    <el-button @click="getFn">Login</el-button>
    <el-button @click="getMenu">getMenu</el-button>
    <el-button type="danger" @click="getAjax">getAjax</el-button>
    <ul>
      <li v-for="item in list" :key="item.id" @click="addList(item.path)">
        <!-- http://localhost:8080/home -->
        <a target="_blank" :href="`http://localhost:8080${item.path}`">{{
          item.name
        }}</a>
      </li>
      <!-- <li v-for="item in list" :key="item.id"><router-link :to="item.path">{{item.name}}</router-link></li> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      list: [
        { id: "1", name: "测试1", path: "/test1" },
        { id: "2", name: "测试2", path: "/test2" },
        { id: "3", name: "测试3", path: "/test3" },
        { id: "5", name: "测试4", path: "/test4" }
      ],
      win_Array: [],
      win_num: 0
    };
  },
  methods: {
    closeFn() {
      for (let i = 0; i < this.win_Array.length; i++) {
        console.log(this.win_Array[i]);
        this.win_Array[i].close();
        // this.win_Array.splice(i, 1)
      }

      console.log(this.win_Array);
    },
    addList(path) {
      this.openNew(path);
    },
    openNew(path) {
      this.win_Array[this.win_num] = window.open(
        `http://localhost:8080${path}`
      );
      this.win_num += 1;
      console.log(this.win_Array);
    },
    getFn () {
      this.$http.requstPostApi('/otp/login',{
        username: 'admin',
        password: 123456
      },'from').then(res=>{
        // username: admin
        // password: 123456
        console.log(res, 32132)
      })
    },
    async getMenu () {
      let datas = await this.$http.requstPostApi('/otp/backstage/get_menu')
      console.log(datas, 99)
    },
    getAjax () {
      this.$http.requstPostApi('/otp/message/list', {
        messageStatus: 0,
        page: 0,
        pageSize: 0,
        userId: 0}
      ).then(res=>{
        console.log(res, 999)
      })
      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
