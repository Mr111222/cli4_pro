<!--
 * @Author: your name
 * @Date: 2020-10-11 20:57:26
 * @LastEditTime: 2020-11-27 21:59:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edite
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
    <div v-html="htmls"></div>
    <el-button @click="getVal">获取</el-button>
  </div>
</template>

<script>
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
      content: `欢迎使用`,
      htmls: "",
      editorOption: {}
    };
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    getVal() {
      console.log(this.content, "content");
      this.htmls = this.content;
    }
  },
  computed: {
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
