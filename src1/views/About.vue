<!--
 * @Author: your name
 * @Date: 2020-11-28 21:14:29
 * @LastEditTime: 2020-12-13 18:52:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\src\views\About.vue
-->
<template>
  <div>
    <div class="edit_container">
      <quill-editor
        style="height:200px;"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      >
      </quill-editor>
    </div>
    {{ logmsg }}
    <el-button @click="getVal">获取</el-button>
    <el-input v-model="msg"></el-input>
    <el-button @click="changeLogMessage">changeLogMessage</el-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      msg: "",
      content: this.$store.state.txt,
      htmls: "",
      editorOption: {
        clipboard: {
          matchVisual: false
        }
      }
    };
  },
  methods: {
    removeHTMLTag(description) {
      description = description.replace(/(\n)/g, "");
      description = description.replace(/(\t)/g, "");
      description = description.replace(/(\r)/g, "");
      description = description.replace(/\s*/g, "");
      return description;
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    getVal() {
      console.log(this.content, "content");
      this.htmls = this.content;
    },
    changeLogMessage() {
      this.$store.commit("login/MESSAGE", this.msg);
    }
  },
  computed: {
    ...mapGetters(["login", "logmsg"]),
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  }
};
</script>
<style>
.edit_container {
  height: 300px;
}
</style>
