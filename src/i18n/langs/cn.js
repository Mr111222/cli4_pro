import enLocale from "element-ui/lib/locale/lang/zh-CN";
const cn = {
  message: {
    mes: "你好"
  },
  // 登陆
  login: {
    btnmsg: "注销",
    msg: "欢迎登录",
    login: "登录",
    user: "用户名",
    password: "密码",
    ver: "验证码",
    click: "点击获取",
    success: "登陆成功",
    out: "登出成功",
    userRule: "请输入用户名",
    passwordRule: "请输入密码",
    codeRule: "请输入验证码"
  },
  del: {
    msg: "此操作将删除该文件，是否继续?",
    tip: "提示",
    ok: "删除成功",
    no: "取消删除"
  },
  language: {
    en: "中文"
  },
  ...enLocale
};
export default cn;
