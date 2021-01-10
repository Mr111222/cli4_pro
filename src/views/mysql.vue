<!--
 * @name: your name
 * @Date: 2020-11-28 21:14:29
 * @LastEditTime: 2021-01-10 13:32:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilesPath: \cli4_pro\src\ages\form.vue
-->
<template>
  <div>
    <el-button @click="newAdd">新增</el-button>
    <el-table :data="list">
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
            <quill-editor
              style="height:200px;"
              v-model="ruleForm.files"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
            >
            </quill-editor>
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
            <quill-editor
              style="height:180px;"
              v-model="editObj.files"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
            >
            </quill-editor>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editUpdata" v-show="isDetail"
          >提交修改</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入标题"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        age: "",
        files: ""
        // id: Math.floor(Math.random() * (255 - 1) * 100)
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
    quillEditor
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
    async getList() {
      let datas = await this.$http.requstGetApi("/api/list");
      this.list = datas;
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
    onEditorReady() {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async deleteRow(id) {
      let datas = await this.$http.requstGetApi(`/api/list/del/${id}`);
      if (datas.err === 0) {
        this.$message.success("删除成功");
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
      } else {
        console.log(datas.datas, 9999);
      }
    }
  }
};
</script>
<style lang="scss">
.el-dialog__body {
  height: 400px !important;
}
</style>
