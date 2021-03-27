<!--<template>
  <div>
    <Table :tableData="tableData" :tableHeader="tableHeader"> </Table>
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'date', order: 'descending' }"
      border
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" />
      <template v-for="(item, key) in tableHeaders">
        <el-table-column
          v-if="item.isShow"
          :key="key + '' + _uid"
          :prop="item.prop"
          :label="item.label"
          :sortable="item.sortable"
          :width="item.width || 'auto'"
        >
          <template slot-scope="scope">
            <div v-tooltip="scope.row[item.prop]">
              <span class="tooltip"
                >{{ scope.row[item.prop] || "--" }}^2.4.5",</span
              >
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
import Table from "@/components/table.vue";
export default {
  data() {
    return {
      tableData: [
        {
          id: "c91977c2-19b0-11eb-9ff3-0a580a4cf31b",
          name: "c918b471-19b0-11eb-9ff3-0a580a4cf31b",
          key: "new-process",
          revision: 2,
          deploymentId: null,
          createTime: "2020-10-29 14:34:24",
          lastUpdateTime: "2020-10-29 14:34:24",
          canExportFlag: false
        },
        {
          id: "3119351a-1839-11eb-8266-0a580a4cf969",
          name: "测试流程跳转",
          key: "test-1021",
          revision: 4,
          deploymentId: "25a5f5a6-18c1-11eb-8b07-0a580a4cf51b",
          createTime: "2020-10-27 17:45:48",
          lastUpdateTime: "2020-10-28 09:59:01",
          canExportFlag: true
        },
        {
          id: "a55be022-181a-11eb-8dbd-0a580a4cf409",
          name: "test-1027",
          key: "test-1027",
          revision: 11,
          deploymentId: "5cfbc0fc-1838-11eb-a36b-0a580a4cf6a6",
          createTime: "2020-10-27 14:07:08",
          lastUpdateTime: "2020-10-27 17:39:52",
          canExportFlag: true
        },
        {
          id: "c63477f3-1772-11eb-b99f-0a580a4cf5b5",
          name: "d23",
          key: "d23",
          revision: 3,
          deploymentId: null,
          createTime: "2020-10-26 18:05:28",
          lastUpdateTime: "2020-10-27 14:06:33",
          canExportFlag: true
        },
        {
          id: "a5bc0641-1769-11eb-b99f-0a580a4cf5b5",
          name: "测试流程-1023",
          key: "test-1023",
          revision: 5,
          deploymentId: "989e010e-181a-11eb-8dbd-0a580a4cf409",
          createTime: "2020-10-26 17:00:08",
          lastUpdateTime: "2020-10-27 14:06:48",
          canExportFlag: true
        },
        {
          id: "e524faeb-0d2c-11eb-ad14-0a580a4cf50a",
          name: "删除回调租户记录",
          key: "D001",
          revision: 40,
          deploymentId: "347c0c61-1741-11eb-a567-0a580a4cfa5d",
          createTime: "2020-10-13 16:20:03",
          lastUpdateTime: "2020-10-26 18:20:32",
          canExportFlag: true
        },
        {
          id: "c1b2f534-0d1f-11eb-981f-0a580a4cf20a",
          name: "34",
          key: "w33",
          revision: 2,
          deploymentId: null,
          createTime: "2020-10-13 14:46:00",
          lastUpdateTime: "2020-10-13 14:46:01",
          canExportFlag: false
        },
        {
          id: "311c2ec5-0c66-11eb-9324-0a580a4cf428",
          name: "H-001",
          key: "H-001",
          revision: 28,
          deploymentId: "eb133500-181b-11eb-8dbd-0a580a4cf409",
          createTime: "2020-10-12 16:37:41",
          lastUpdateTime: "2020-10-27 14:16:15",
          canExportFlag: true
        },
        {
          id: "3ba2f718-0171-11eb-82c5-0a580a4cf57d",
          name: "T001",
          key: "T001",
          revision: 19,
          deploymentId: "bf0a62d6-0d22-11eb-9510-0a580a4cf522",
          createTime: "2020-09-28 17:59:00",
          lastUpdateTime: "2020-10-13 15:07:25",
          canExportFlag: true
        }
      ], // 请求到的表格数据

      tableHeaders: [
        {
          prop: "id",
          label: "ID",
          sortable: true,
          showOverflowTooltip: true,
          width: "",
          isShow: true
        },
        {
          prop: "name",
          label: "模型名称222",
          sortable: false,
          showOverflowTooltip: true,
          width: "",
          isShow: true
        },
        {
          prop: "key",
          label: "key",
          sortable: false,
          showOverflowTooltip: true,
          width: "",
          isShow: true
        },
        {
          prop: "deploymentId",
          label: "部署ID",
          sortable: false,
          showOverflowTooltip: true,
          width: "",
          isShow: true
        },
        {
          prop: "createTime",
          label: "创建时间",
          sortable: false,
          showOverflowTooltip: true,
          width: "",
          isShow: true
        },
        {
          prop: "lastUpdateTime",
          label: "最后更新时间",
          sortable: false,
          showOverflowTooltip: true,
          width: "",
          isShow: true
        }
      ],
      tableHeader: [
        // 表头信息
        {
          prop: "name",
          label: "领域",
          columnKey: "fieldType",
          filterMultiple: false,
          minWidth: "150px",
          fixed: true
        },
        { prop: "city", label: "详情", minWidth: "180px" },
        {
          prop: "address",
          label: "关联律师数量",
          minWidth: "150px",
          router: { path: "/" }
        },
        {
          prop: "articlesNumber",
          label: "相关文章数量",
          router: { path: "/case-management" },
          minWidth: "150px"
        },
        {
          prop: "operation",
          label: "相关服务",
          minWidth: "260px",
          style: { display: "block" },
          operation: [
            { name: "服务方案一", clickFun: this.getServiceOne },
            { name: "服务方案二", clickFun: this.getServiceTwo },
            { name: "服务方案三", clickFun: this.getServiceThird }
          ]
        },
        {
          prop: "date",
          custom: "custom",
          label: "最后更新时间",
          minWidth: "180px",
          formatData: this.formatDate
        },
        { prop: "updater", label: "最后更新人", minWidth: "120px" },
        {
          prop: "operation",
          label: "操作",
          minWidth: "260px",
          operation: this.fieldStatus
            ? [
                { name: "上线", disabled: true, clickFun: this.onLineField },
                { name: "下线", underline: true, clickFun: this.underField }
              ]
            : [
                { name: "编辑", clickFun: this.editDomain },
                { name: "删除", clickFun: this.delField },
                { name: "待审核", clickFun: this.examineField }
              ]
        }
      ]
    };
  },
  components: {
    Table
  }
};
</script> -->
<template>
  <div>
    <template>
      <el-table
        :class="className ? className : ''"
        :data="tableData"
        style="width: 100%"
        @cell-mouse-enter="setHover"
      >
        <el-table-column class-name="data" prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column class-name="name" prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column class-name="adr" prop="address" label="地址">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      className: "oooop",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    setHover(column, cell) {
      let className = "";
      switch (cell.className) {
        case "data":
          className = "box_data";
          break;
        case "name":
          className = "box_name";
          break;
        case "adr":
          className = "box_adr";
          break;
      }
      this.className = className;
    }
  }
};
</script>

<style lang="scss">
$arrColor: (
  (
    name: "name",
    val: #f0ad42
  ),
  (
    name: "adr",
    val: #1aad19
  ),
  (
    name: "data",
    val: #4e9ef0
  )
);

@for $i from 1 through length($arrColor) {
  $item: nth($arrColor, $i);
  .box_#{map-get($item, name)} {
    &:hover {
      .#{map-get($item, name)} {
        background: map-get($item, val) !important;
      }
    }
  }
}
</style>
