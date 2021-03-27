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
    val: #f0ad4e
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
