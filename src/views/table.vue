<!--
 * @Author: your name
 * @Date: 2020-11-27 22:09:32
 * @LastEditTime: 2020-11-28 21:13:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\src\views\table.vue
-->
<template>
  <div>
    <div>
      <vxe-table
        height="300px"
        ref="xTree"
        show-overflow
        border
        resizable
        row-id="id"
        :tree-config="treeConfig"
        :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
        :data="listData"
      >
        <vxe-table-column type="checkbox" title="序号" width="80" />
        <vxe-table-column field="name" title="应用编码" tree-node />
        <vxe-table-column field="type" title="操作名称" />
        <vxe-table-column field="date" title="URL" />
        <vxe-table-column field="operationNameEn" title="操作英文名称" />
        <vxe-table-column title="操作" width="220">
          <template slot-scope="{ row }">
            <el-link
              v-if="row.operationId"
              type="primary"
              size="mini"
              @click="viewRole(row)"
              >查看角色</el-link
            >
            <el-link
              v-if="!row.operationId"
              type="primary"
              size="mini"
              @click="handleCreate(row)"
              >新增子API</el-link
            >
            <el-link
              v-if="row.operationId"
              type="primary"
              size="mini"
              @click="handleUpdate(row)"
              >编辑</el-link
            >
            <el-link
              v-if="row.operationId"
              type="danger"
              size="mini"
              @click="handleDelete(row)"
              >删除</el-link
            >
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <el-button @click="expendAll">展开全部</el-button>
    <el-button @click="appendFn">添加</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeConfig: {
        children: "children"
      },
      listData: null,
      list: [
        {
          id: 1000,
          name: "vxe-table 从入门到放弃1",
          type: "mp3",
          size: 1024,
          date: "2020-08-01"
        },
        {
          id: 1005,
          name: "Test2",
          type: "mp4",
          size: null,
          date: "2021-04-01",
          children: [
            {
              id: 24300,
              name: "Test3",
              type: "avi",
              size: 1024,
              date: "2020-03-01"
            },
            {
              id: 20045,
              name: "vxe-table 从入门到放弃4",
              type: "html",
              size: 600,
              date: "2021-04-01"
            },
            {
              id: 10053,
              name: "vxe-table 从入门到放弃96",
              type: "avi",
              size: null,
              date: "2021-04-01",
              children: [
                {
                  id: 24330,
                  name: "vxe-table 从入门到放弃5",
                  type: "txt",
                  size: 25,
                  date: "2021-10-01"
                }
              ]
            }
          ]
        },
        {
          id: 23666,
          name: "Test8",
          type: "xlsx",
          size: 2048,
          date: "2020-11-01"
        },
        {
          id: 24555,
          name: "vxe-table 从入门到放弃9",
          type: "avi",
          size: 224,
          date: "2020-10-01"
        }
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.listData = this.list;
    },
    expendAll() {
      this.$refs.xTree.setAllTreeExpand(true);
    },
    appendFn() {
      this.list.push({
        id: Math.random() * 1000 + 1,
        name: `vxe-table 从入门到放弃${Math.random() * 1000 + 1}`,
        type: "avi",
        size: 224,
        date: "2020-10-01"
      });
      this.init();
    },
    selectChangeEvent({ records }) {
      console.info(`勾选${records.length}个树形节点`, records);
    }
  }
};
</script>
<style scoped></style>
