<!-- 
  1.停止队列没有使用
  2.createBegin 创建 一个新对象 const u = new TimeQueue() u.setFile(datas)通过setFile来获取传递来文件的参数
  3.handleClickStop 点击停止,中断当前的运行的，开始自己点击的。这里都是通过下标来进行选择的。
  4.handleClickContinue 点击上传(继续上传) 通过flag重置标志位，和调用stop方法来停止其他，同时来启动点击当前的进程
  5.handleClickDel 点击删除,先调用停止方法stop, 然后去数据里删除进程，这里最后也可以ajax通过接口来进行删除。 
  15711262796
  15210482590
  131082199003312911
  2018/10/22-2038/10/22
-->
<template>
  <div>
    <div>
      <el-button @click="createBegin">createBegin</el-button>
    </div>
    <div class="btns">
        <p v-for="(item, index) in lists" class="ps" @click='toOne(index)'><b>{{item}}</b></p>
    </div>
    <div class="begin">
      <el-table :data="beginList">
        <el-table-column
        prop="id"
        label="Id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="num"
        label="Num">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="Operations"
      width="120">
      <template slot-scope="scope">
        <el-tag style="cursor: pointer;margin-right: 10px;" size="mini" type="warning" @click="handleClickStop(scope.$index)" v-if="scope.row.flag === true">停止</el-tag>
        <el-tag style="cursor: pointer;margin-right: 10px;" size="mini" type="success" @click="handleClickContinue(scope.$index, scope.row.id)" v-else>上传</el-tag>
        <el-tag size="mini" type="danger" @click="handleClickDel(scope.$index, scope.row.id)">删除</el-tag>
      </template>
    </el-table-column>
      </el-table>
    </div>
    <div> 
      <el-button @click="beginTime">开始⏲</el-button> 
        <el-input-number v-model="num"></el-input-number>
      <el-button @click="stopTime">停止⏲</el-button></div>
  </div>
</template>

<script>
  import {Task, TimeQueue} from '@/utils/newQueue'
  import { createName, createId} from '@/utils'
  const runningQueue = new Task()
  export default {
    name: 'task',
    data () {
      return {
        stopList: [],
        beginList: [],
        lists: [0,1,2,3,4,5,6,7,8,9],
        timers: null,
        num: 0,
        flag: false
      }
    },
    mounted() {
    },
    methods: {
      getfirst () {
        let s = 'abcdefg'
        for(var i=0;i<s.length; i++) {
          console.log(s[i])
        }
      },
      beginTime () {
       if(!this.flag) {
        this.timers = setInterval(()=>{
          this.num+=1
        }, 1000)
        this.flag = true
       }
        
      },
      stopTime () {
        clearInterval(this.timers) 
        this.flag = false
      },
      toOne (index) {
        let _val = this.lists[index]
        this.lists.splice(index, 1)
        this.lists.unshift(_val)
      },
      createBegin () {
        const beginListLength = runningQueue.getQueue().length;
        let datas = {
          id: createId() + new Date().getTime(),
          date: '2020-12-30',
          name: createName(),
          num: 0
        }
        const u = new TimeQueue()
        u.setFile(datas)
        runningQueue.addTask(u);
        if(beginListLength === 0) {
          runningQueue.execute(0);
        }
        this.beginList = runningQueue.getQueue()
      },

      // 点击停止
      handleClickStop (index) {
        const beginList = runningQueue.getQueue();
        if (beginList.length > index && index >= 0) {
          for(let i=0; i<beginList.length; i++) {
            beginList[i].stop();
            beginList[i].flag = false
          }
          runningQueue.running = false;
          this.beginList = runningQueue.getQueue()
          this.$set(this.beginList, index, beginList[index])
        }
      },

      // 点击上传
      handleClickContinue (index, id) {
        const list1 = runningQueue.getQueue();
        for(let i=0; i<list1.length; i++) {
          list1[i].stop();
          list1[i].flag = false
        }
        runningQueue.running = false;
        runningQueue.execute(index);
      },

      handleClickDel (index, id) {
        var list0 = runningQueue.getQueue();
        for(let i=0; i<list0.length; i++) {
          if (list0[i].id === id) {
            runningQueue.removeTask(list0[i]);
            this.beginList = runningQueue.getQueue()
            break;
          }
        }        
      },
    }
  }
</script>

<style lang="scss">
.btns {
  margin-top: 20px;
  height: 40px;
  .ps {
    float: left;
    margin: 0 10px;
    b{
      padding: 10px;
      text-align: center;
      border-radius: 5px;
      background: pink;
      color:#3da123;
    }
  }
}
  
</style>
