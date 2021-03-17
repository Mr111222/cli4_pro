<template>
  <div>
    <div>
      <el-button @click="createBegin">createBegin</el-button>
      <el-button @click="getTaskBegin">getTaskBegin</el-button>
      <el-button @click="getTaskStop">getTaskStop</el-button>
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
        <el-tag style="cursor: pointer;margin-right: 10px;" size="mini" type="warning" @click="handleClickStop(scope.$index)" v-if="scope.row.xx === true">停止</el-tag>
        <el-tag style="cursor: pointer;margin-right: 10px;" size="mini" type="success" @click="handleClickContinue(scope.$index, scope.row.id)" v-if="scope.row.xx === false">上传</el-tag>
        <el-tag size="mini" type="danger" @click="handleClickDel(scope.$index, scope.row.id)">删除</el-tag>
      </template>
    </el-table-column>
      </el-table>
    </div>
    </div>
  </div>
</template>

<script>
  import {Task, TimeQueue} from '@/utils/queue'
  const runningQueue = new Task()
  const stopQueue = new Task()
  export default {
    name: 'task',
    data () {
      return {
        stopList: [],
        beginList: []
      }
    },
    methods: {
      createBegin () {
        let datas = {
          id:  new Date().getTime(),
          date: '2020-12-30',
          name: 'zz',
          num: 0
        }
        const u = new TimeQueue()
        u.setFile(datas)
        runningQueue.addTask(u);
        runningQueue.execute(0);
        this.beginList = runningQueue.getQueue()
      },
      getTaskBegin () {
        console.log(runningQueue.getQueue(), 'begin....')
      },
      getTaskStop () {
        console.log(stopQueue.getQueue(), 'stop....')
      },
      // 开始队列的停止
      handleClickStop (index) {
        const beginList = runningQueue.getQueue();
        if (beginList.length > index && index >= 0) {
          beginList[index].stop();
          var task = runningQueue.removeTaskAt(index);
          task.xx = false
          stopQueue.addTask(task);
          this.createUploadPanel()
        }
      },

      // 停止队列的开始
      handleClickContinue (index, id) {
        const list1 = stopQueue.getQueue();
        for(let i=0; i<list1.length; i++) {
          if (list1[i].id === id) {
            const task = stopQueue.removeTaskAt(i);
            task.xx = true
            runningQueue.addTask(task);
            this.createUploadPanel();
            break;
          }
        }

      },

      // 更新面板数据
      createUploadPanel () {
        runningQueue.running = false;
        runningQueue.execute(0);
        this.beginList = runningQueue.getQueue().concat(stopQueue.getQueue())
        // this.stopList = stopQueue.getQueue()
      },


      handleClickDel (index, id) {
        var list1 = stopQueue.getQueue();
        var list0 = runningQueue.getQueue();

        for(let i=0; i<list0.length; i++) {
          if (list0[i].id === id) {
            runningQueue.removeTask(list0[i]);
            this.beginList = runningQueue.getQueue().concat(stopQueue.getQueue())
            break;
          }
        }

        for(let i=0; i<list1.length; i++) {
          if (list1[i].id === id) {
            stopQueue.removeTask(list1[i]);
            this.beginList = runningQueue.getQueue().concat(stopQueue.getQueue())
            break;
          }
        }
      },

    }
  }
</script>


