<!--
 * @Author: your name
 * @Date: 2021-01-28 15:32:39
 * @LastEditTime: 2021-01-28 16:26:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\src\components\wangEditor.vue
-->
<template>
  <div class="home">
    <div id="demo1"></div>
  </div>
</template>

<script>
// 引入 wangEditor
import wangEditor from "wangeditor";
export default {
  props: {
    content: {
      type: String,
      default: () => ""
    },
    isClear: {
      type: Boolean,
      default: false
    },
    isDetail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editor: null,
      editorData: ""
    };
  },
  watch: {
    isClear(val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear();
        this.editorData = null;
      }
    },
    isDetail(val) {
      // 是否可编辑
      if (!val) {
        this.editor.disable();
      }
    },
    content(value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.content);
      }
    }
  },
  mounted() {
    this.seteditor();
    this.editor.txt.html(this.content);
  },
  methods: {
    seteditor() {
      const editor = new wangEditor("#demo1");
      // editor.config.showLinkImg = false
      editor.config.uploadImgShowBase64 = false; // base 64 存储图片
      editor.config.uploadImgServer =
        "http://otp.cdinfotech.top/file/upload_images"; // 配置服务器端地址
      editor.config.uploadImgHeaders = {}; // 自定义 header
      editor.config.uploadFileName = "file"; // 后端接受上传文件的参数名
      editor.config.uploadImgMaxSize = 2 * 1024 * 1024; // 将图片大小限制为 2M
      editor.config.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
      editor.config.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间

      editor.config.uploadImgHooks = {
        fail: (xhr, editor, result) => {
          // 插入图片失败回调
        },
        success: (xhr, editor, result) => {
          // 图片上传成功回调
        },
        timeout: (xhr, editor) => {
          // 网络超时的回调
        },
        error: (xhr, editor) => {
          // 图片上传错误的回调
        },
        customInsert: (insertImg, result, editor) => {
          // 图片上传成功，插入图片的回调
          //result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
          // console.log(result.data[0].url)
          //insertImg()为插入图片的函数
          //循环插入图片
          // for (let i = 0; i < 1; i++) {
          // console.log(result)
          // }

          let url = "http://otp.cdinfotech.top" + result.url;
          insertImg(url);
        }
      };
      editor.config.onchange = html => {
        this.editorData = html;
        this.$emit("change", this.editorData); // 将内容同步到父组件中
      };
      editor.config.menus = [
        "head", // 标题
        "bold", // 粗体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "image", // 插入图片
        "undo" // 撤销
      ];
      // 创建编辑器
      editor.create();
      this.editor = editor;
    }
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  }
};
</script>

<style lang="scss">
.home {
  width: 820px;
  .w-e-text-container {
    height: 240px !important;
  }
  margin: auto;
  position: relative;
  .btn {
    position: absolute;
    right: 0;
    top: 0;
    padding: 5px 10px;
    cursor: pointer;
  }
  h3 {
    margin: 30px 0 15px;
  }
}
</style>
