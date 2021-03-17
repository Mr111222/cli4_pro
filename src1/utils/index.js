import md5 from "js-md5";

/**
 * @description: 生成任一位数随机数
 * @param {len} 生成的位数
 */
const getRandom = len => {
  if (!len) {
    throw new Error(`参数不能为空`);
  } else {
    if (len <= 0) {
      throw new Error(`参数不能小于0`);
    } else {
      let num = "";
      for (let i = 0; i < len; i++) {
        num += Math.floor(Math.random() * 10);
      }
      return num;
    }
  }
};

/**
 * @description: 生成UUId值
 */

const getUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * @description: 通过MD5加密生成token
 */

const setToken = () => {
  let rod = Math.random();
  return md5(rod + "zz");
};

const localData = function(method, name, obj) {
  /*
   * 参数说明：
   * method：get获取，set存入或覆盖，clean清除
   * name:localStorage的名称
   * obj:存入的内容，可以是任意类型
   * localStorage.getItem(key):获取指定key本地存储的值
   * localStorage.setItem(key,value)：将value存储到key字段
   * localStorage.removeItem(key):删除指定key本地存储的值
   * */

  switch (method) {
    case "get":
      if (localStorage.getItem(name)) {
        return JSON.parse(localStorage.getItem(name));
      } else if (localStorage.getItem(name)) {
        return localStorage.getItem(name);
      } else {
        return null;
      }
    case "set":
      localData("clean", name);
      if (typeof obj == "object") {
        localStorage.setItem(name, JSON.stringify(obj));
      } else {
        localStorage.setItem(name, obj);
      }
      return true;
    case "clean":
      localStorage.removeItem(name);
      localStorage.removeItem(name);
      return true;
  }
};

// session操作
const sessionData = function(method, name, obj) {
  /*
   * 参数说明：
   * method：get获取，set存入或覆盖，clean清除
   * name:session的名称
   * obj:存入的内容，可以是任意类型
   * */
  switch (method) {
    case "get":
      if (sessionStorage.getItem(name)) {
        return sessionStorage.getItem(`${name}`);
      } else if (sessionStorage.getItem(name)) {
        return sessionStorage.getItem(name);
      } else {
        return null;
      }
    case "set":
      sessionData("clean", name);
      if (typeof obj == "object") {
        sessionStorage.setItem(name, JSON.stringify(obj));
      } else {
        sessionStorage.setItem(name, obj);
      }
      return true;
    case "clean":
      sessionStorage.removeItem(name);
      sessionStorage.removeItem(name);
      return true;
  }
};
export { getRandom, getUID, setToken, localData, sessionData };
