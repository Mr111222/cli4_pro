<template>
  <div>
    <div>
      <el-button @click="createBegin">createBegin</el-button>
      <el-button @click="createStop">createStop</el-button>
      <el-button @click="getTaskBegin">getTaskBegin</el-button>
      <el-button @click="getTaskStop">getTaskStop</el-button>
    </div>
    <div>开始队列</div>
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
        <el-button @click="handleClickStop(scope.row, scope.row.id)" type="text" size="small">Stop</el-button>
        <el-button @click="handleClickDel(scope.row.id)" type="text" size="small">Delete</el-button>
      </template>
    </el-table-column>
        
      </el-table>
    </div>
    <hr />
    <hr />
    <hr />
    <div>停止队列</div>
     <div class="begin">
      <el-table :data="stopList">
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
        <el-button @click="handleClickContinue(scope.row, scope.row.id)" type="text" size="small">Continue</el-button>
        <el-button @click="handleClickDel(scope.row.id)" type="text" size="small">Delete</el-button>
      </template>
    </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import Task from '@/utils/queue'
  const tast = new Task()
  export default {
    name: 'task',
    data () {
      return {
        tast,
        stopList: [],
        beginList: []
      }
    },
    methods: {
      createBegin () {
        const datas = {
          id: this.tast.createId() + new Date().getTime(),
          date: '2020-12-30',
          name: this.tast.createName(),
          num: 0
        }
        this.beginList.push(datas)
        this.tast.addBegin(datas)
        this.getQueueData()
      },
      createStop () {
        
      },
      getTaskBegin () {
        console.log(this.tast.getBeginData(), 'begin....')
      },
      getTaskStop () {
        console.log(this.tast.getStopData(), 'stop....')
      },

      // 开始队列的停止
      handleClickStop (ele, id) {
        this.stopList.push(ele)
        this.tast.addStop(ele, id)
        this.getQueueData()
        this.delBegin(id)
      },

      // 停止队列的开始
      handleClickContinue (ele, id) {
        this.tast.addBegin(ele, id)
        this.beginList.push(ele)
        this.getQueueData()
        this.delStop(id)
      },
      handleClickDel () {},
      removeBegin (id) {
      },

      // 单数据处理
      getQueueData () {
        this.$set(this, 'beginList', this.tast.getBeginData())
        this.$set(this, 'stopList',this.tast.getStopData())
      },
      delBegin (id) {
        this.beginList = this.beginList.filter((item) => {
            return id !== item.id;
        });
      },
      delStop (id) {
        this.stopList = this.stopList.filter((item) => {
            return id !== item.id;
        });
      }
    }
  }
</script>