<template>
  <div class="projectTable">
    <el-table :data="tableData" :highlight-current-row="true" height="100%">
      <el-table-column
        fixed
        label="Number"
        type="index"
        width="80"
        align="center"
      >
      </el-table-column>
      <el-table-column label="describe">
        <template slot-scope="scope"
          ><span v-html="escapeStringHTML(scope.row.describe)"></span
        ></template>
      </el-table-column>
      <el-table-column
        prop="version"
        label="version"
        align="center"
      ></el-table-column>
      <el-table-column
        fixed="right"
        label="Operation"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-button @click="editFn(scope.row)" type="text" size="small"
            >edit</el-button
          >
          <el-button type="text" size="small" @click="deleteFn(scope.row)"
            >delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-button type="primary" @click="newLog">新建ReleaseNotes</el-button>
      <el-button type="primary" @click="openSendMail"
        >发送ReleaseNotes</el-button
      >
    </div>
    <el-dialog
      top="3vh"
      title="发送ReleaseNotes"
      :visible.sync="sendMailshow"
      width="80%"
      :before-close="beforeCloseMain"
    >
      <el-form
        :model="ruleFormMain"
        :rules="rulesMail"
        ref="ruleFormMain"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="subject">
          <el-input v-model="ruleFormMain.subject" placeholder="请输入标题">
          </el-input>
        </el-form-item>
        <el-form-item label="To" prop="To">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            v-model="ruleFormMain.To"
            placeholder="请输入收件人的电子邮件地址。多个收件人用逗号分隔。"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="CC" prop="cc">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            v-model="ruleFormMain.cc"
            placeholder="请输入收件人的电子邮件地址。多个收件人用逗号分隔。"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="内容" prop="describe" class="el-edit_box">
          <div class="edit_container">
            <quill-editor
              style="height:200px;"
              v-model="ruleFormMain.describe"
              ref="myQuillEditor"
              :options="editorOption"
            >
            </quill-editor>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendMailSub('ruleFormMain')"
            >发送</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      top="10vh"
      :title="logMsgTitle"
      :visible.sync="logMsg"
      width="80%"
      :before-close="beforeClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="版本号" prop="version">
          <el-input v-model="ruleForm.version" placeholder="请输入版本号">
          </el-input>
        </el-form-item>
        <el-form-item label="更新内容" prop="describe" class="el-edit_box">
          <div class="edit_container">
            <quill-editor
              style="height:200px;"
              v-model="ruleForm.describe"
              ref="myQuillEditor"
              :options="editorOption"
            >
            </quill-editor>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')" v-show="!this.ruleForm.id"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
const checkEmail = (rule, value, callback) => {
  const mailReg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
  if (!value) return callback(new Error("请输入收件人"));
  const vals = value.trim().replace(/\s+/g, "");
  if (vals.indexOf(",") > 0) {
    const state = vals.split(",").every(cur => mailReg.test(cur));
    if (!state) {
      callback(new Error("请输入正确的邮箱格式"));
    } else {
      callback();
    }
  } else {
    if (mailReg.test(vals)) {
      callback();
    } else {
      callback(new Error("请输入正确的邮箱格式"));
    }
  }
};
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      tableData: [
        {
          version: "v1.5",
          describe: "&lt;p&gt;PMFP版本 /p&gt;",
          releaseDate: "2021-06-19 00:00:00",
          id: 145,
          createTime: "2021-06-19 08:21:42",
          createUser: "3306140789808909566",
          updateTime: null,
          updateUser: null
        },
        {
          version: "v1.3",
          describe: "sssss",
          releaseDate: "2021-06-18 00:00:00",
          id: 144,
          createTime: "2021-06-18 21:55:29",
          createUser: "3306140789808909566",
          updateTime: "2021-06-18 21:55:37",
          updateUser: "3306140789808909566"
        },
        {
          version: "v1.2",
          describe: "PMFP版本 v1.2 ",
          releaseDate: "2021-06-18 00:00:00",
          id: 127,
          createTime: "2021-06-18 10:28:35",
          createUser: "3306140789808909566",
          updateTime: null,
          updateUser: null
        }
      ],
      editorOption: {
        modules: {
          clipboard: {
            matchVisual: false
          },
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"]
          ]
        }
      },
      logMsg: false,
      logMsgTitle: "",
      ruleForm: {
        describe: "",
        version: ""
      },
      parmasEdit: null,
      rules: {
        describe: [
          {
            required: true,
            message: "请输入更新内容",
            trigger: "blur"
          }
        ],
        version: [
          {
            required: true,
            message: "请输入版本号",
            trigger: "blur"
          }
        ]
      },
      ruleFormMain: {
        subject: "",
        To: "",
        cc: "",
        describe: ""
      },
      rulesMail: {
        subject: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          }
        ],
        To: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              checkEmail(rule, value, callback);
            }
          }
        ],
        cc: [
          // {
          //   required: true,
          //   trigger: 'blur',
          //   validator: (rule, value, callback) => {
          //     checkEmail(rule, value, callback)
          //   }
          // },
        ],
        describe: [
          {
            required: true,
            message: "请输入邮件内容",
            trigger: "blur"
          }
        ]
      },
      sendMailshow: false
    };
  },
  watch: {
    "ruleForm.describe"(val1, val2) {
      let reg = /(<.*?)(on.*?=)(.*?>)/gi;
      if (val1 !== val2 && val1) {
        // this.ruleForm.describe = val1.replace(reg, function($1, $2, $3, $4) {
        //   return $2 + $4;
        // });
        this.ruleForm.describe = this.replaceStr(val1);
      }
    }
  },
  methods: {
    replaceStr(s) {
      var pattern = new RegExp(
        "[`~!@#$^&*()=|{}':;',\\[\\].~！@#￥……&*（）——|{}【】‘；：”“'。，、？?]"
      );
      var rs = "";
      if (s) {
        for (var i = 0; i < s.length; i++) {
          rs = rs + s.substr(i, 1).replace(pattern, "");
        }
        return rs;
      }
    },
    escapeStringHTML(str) {
      if (str) {
        str = str.replace(/&lt;/g, "<");
        str = str.replace(/&gt;/g, ">");
        return str;
      }
    },
    getTableData() {
      this.$http({
        url: "portal/releaseNote/query",
        method: "get"
      }).then(res => {
        if (res.data.code == "000000") {
          this.tableData = res.data.data;
        }
      });
    },
    newLog() {
      this.ruleForm = {};
      this.logMsg = true;
      this.logMsgTitle = "新建ReleaseNotes";
    },
    async subLog() {
      let obj = {};
      const reg = /(<.*?)(on.*?=)(.*?>)/gi;
      this.ruleForm.describe = this.escapeStringHTML(
        this.ruleForm.describe
      ).replace(reg, function($1, $2, $3, $4) {
        return $2 + $4;
      });
      if (this.ruleForm.id) {
        (obj.data = this.ruleForm), (obj.url = "portal/releaseNote/edit");
      } else {
        (obj.data = this.ruleForm), (obj.url = "portal/releaseNote/add");
      }
      let datas = await this.$http({
        url: obj.url,
        method: "post",
        data: obj.data
      });
      if (datas.data.code === "000000") {
        this.$message({
          type: "success",
          message: datas.data.message
        });
        this.$store.commit("setLevel", this.ruleForm.version);
        this.resetForm("ruleForm");
        this.ruleForm = {};
        this.logMsg = false;
        this.getTableData();
      }
    },
    editFn(row) {
      this.parmasEdit = row;
      this.logMsg = true;
      this.logMsgTitle = "修改ReleaseNotes";
      this.ruleForm = row;
      this.ruleForm.describe = this.escapeStringHTML(row.describe);
      this.get_Index(row.describe ? row.describe.length : 0);
    },
    // 光标位置放到最后
    get_Index(len) {
      this.$nextTick(() => {
        let quill = this.$refs.myQuillEditor.quill;
        quill.setSelection(len);
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.subLog();
        } else {
          return false;
        }
      });
    },
    async deleteFn(row) {
      let data = row.id;
      let datas = await this.$http({
        url: "portal/releaseNote/remove",
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        data
      });
      if (datas.data.code === "000000") {
        this.$message({
          type: "success",
          message: datas.data.message
        });
        this.$store.commit("getVersion", Math.random());
        this.getTableData();
      } else {
        this.$message({
          type: "error",
          message: datas.data.message
        });
      }
    },
    openSendMail() {
      this.sendMailshow = true;
      this.ruleFormMain.describe = this.escapeStringHTML(
        this.tableData[0].describe
      );
    },
    sendMailSub(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.sendMail();
        } else {
          return false;
        }
      });
    },
    async sendMail() {
      const params = new FormData();
      params.append("htmlBodyContentSource", this.ruleFormMain.describe);
      params.append("subject", this.ruleFormMain.subject);
      params.append("to", this.ruleFormMain.To);
      params.append("cc", this.ruleFormMain.cc);
      params.append("type", 2);
      let datas = await this.$http({
        url: "/message/mail/sendRecordsHead/test/send",
        method: "post",
        data: params
      });
      if (datas.data.code === "000000") {
        this.$message({
          type: "success",
          message: "发送成功"
        });
        this.resetForm("ruleFormMain");
        this.sendMailshow = false;
      }
    },
    beforeClose() {
      this.resetForm("ruleForm");
      this.logMsg = false;
      this.getTableData();
    },
    beforeCloseMain() {
      this.resetForm("ruleFormMain");
      this.sendMailshow = false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  created() {
    // this.getTableData();
  }
};
</script>
<style lang="scss">
.el-edit_box {
  height: 280px;

  .el-form-item__error {
    margin-top: 65px;
  }
}

.projectTable {
  width: 80%;
  height: 100;
}
</style>
