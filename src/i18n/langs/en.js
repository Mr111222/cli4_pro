/*
 * @Author: your name
 * @Date: 2020-10-11 14:00:46
 * @LastEditTime: 2020-10-11 14:02:23
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \project-three\src\i18n\langs\en.js
 */
import enLocale from "element-ui/lib/locale/lang/en";
const en = {
  message: {
    mes: "hello"
  },
  login: {
    btnmsg: "cancel",
    msg: "Welcome to login",
    login: "Sign in",
    user: "User",
    password: "Password",
    ver: "Code",
    click: "Click to get",
    success: "Login Success",
    out: "Login out",
    userRule: "Please input a username",
    passwordRule: "Please input a password",
    codeRule: "Please enter the verification code"
  },
  del: {
    msg: "This operation will delete the file. Do you want to continue?",
    tip: "Tip",
    ok: "Del Success",
    no: "Cancel deletion"
  },
  language: {
    en: "English"
  },
  ...enLocale
};
export default en;
