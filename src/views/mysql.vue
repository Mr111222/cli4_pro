<!--
 * @name: your name
 * @Date: 2020-11-28 21:14:29
 * @LastEditTime: 2021-07-03 11:14:58
 * @LastEditors: zz
 * @Description: In User Settings Edit
 * @FilesPath: \cli4_pro\src\ages\form.vue
-->
<template>
  <div>
    <el-button @click="newAdd">新增</el-button>
    <el-table :data="list" height="500">
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="age" label="描述"> </el-table-column>
      <el-table-column prop="files" label="模板" show-overflow-tooltip>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.row.id)"
            type="text"
            size="small"
          >
            移除
          </el-button>
          <el-button
            @click.native.prevent="detailRow(scope.row.id)"
            type="text"
            size="small"
          >
            详情
          </el-button>
          <el-button
            @click.native.prevent="updataRow(scope.row.id)"
            type="text"
            size="small"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageObj.current"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageObj.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageObj.total"
    >
    </el-pagination>
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="80%"
      ref="elDialog"
      center
      top="10px"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="files" prop="files">
          <div class="edit_container">
            <editor-bar
              v-model="ruleForm.files"
              @change="wangChange"
            ></editor-bar>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="upMsg"
      :visible.sync="editorVisable"
      width="80%"
      top="10px"
    >
      <div class="edit_container">
        <el-form :model="editObj" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名">
            <el-input v-model="editObj.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="editObj.age"></el-input>
          </el-form-item>
          <el-form-item label="files" prop="files">
            <editor-bar
              @change="wangChangeUpdata"
              :content="editObj.files"
              :is-detail="isDetail"
            ></editor-bar>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer" v-if="isDetail">
        <el-button type="primary" @click="editUpdata">提交修改</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-else>
        <el-button type="primary" @click="closeUpdata">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import EditorBar from "../components/wangEditor";
export default {
  data() {
    var checkage = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        callback();
      });
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入标题"));
      } else {
        callback();
      }
    };
    return {
      isClear: false,
      ruleForm: {
        name: "",
        age: "",
        files: ""
      },
      pageObj: {
        current: 1,
        limit: 10,
        total: 0
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        age: [{ validator: checkage, trigger: "blur" }]
      },
      dialogVisible: false,
      editorVisable: false,
      isDetail: false,
      upMsg: "查看",
      labelPosition: "right",
      editorMsg: "",
      list: [],
      editObj: {
        name: "",
        age: "",
        files: "",
        id: ""
      },
      editorOption: {
        clipboard: {
          matchVisual: false
        }
      }
    };
  },
  components: {
    EditorBar
  },
  mounted() {
    this.getList();
  },
  methods: {
    newAdd() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.elDialog.style.height = "50%";
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addFn(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async getList(val = 1) {
      let data = {
        page: this.pageObj.current > 1 ? this.pageObj.current : val,
        size: this.pageObj.limit
      };
      let datas = await this.$http.requstPostApi(`/api/listPage`, data);
      this.list = datas.list;
      this.pageObj.total = datas.total;
    },
    async addFn(data) {
      let datas = await this.$http.requstPostApi("/api/list/add", data);
      if (datas.err === 0) {
        this.$message.success("添加成功");
        this.resetForm("ruleForm");
        this.dialogVisible = false;
        this.getList();
      }
    },
    // wangChange emit change
    wangChange(val) {
      this.ruleForm.files = val;
    },
    wangChangeUpdata(val) {
      this.editObj.files = val;
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    async handleCurrentChange(val) {
      this.pageObj.current = val;
      this.getList(val);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async deleteRow(id) {
      let datas = await this.$http.requstGetApi(`/api/list/del/${id}`);
      if (datas.err === 0) {
        this.$message.success("删除成功");
        if (this.list.length - 1 <= 0 && this.pageObj.current > 1) {
          this.pageObj.current -= 1;
        }
        this.getList();
      }
    },
    async detailRow(id) {
      this.isDetail = false;
      this.upMsg = "查看";
      let datas = await this.$http.requstGetApi(`/api/list/${id}`);
      if (datas.err === 0) {
        this.editObj = datas.data[0];
        this.editorVisable = true;
      }
    },
    async updataRow(id) {
      this.isDetail = true;
      this.upMsg = "编辑";
      let datas = await this.$http.requstGetApi(`/api/list/${id}`);
      if (datas.err === 0) {
        this.editObj = datas.data[0];
        this.editorVisable = true;
      }
    },
    async editUpdata() {
      this.ruleForm.files = this.editorMsg;
      let datas = await this.$http.requstPostApi(
        "/api/list/updata",
        this.editObj
      );
      if (datas.err === 0) {
        this.editorVisable = false;
        this.getList();
      }
    },
    closeUpdata() {
      this.editorVisable = false;
    }
  }
};
</script>
<style lang="scss">
.el-dialog__body {
  height: 450px !important;
}
</style>
