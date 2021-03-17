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

var familyNames = [
"赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", 
"褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
"何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏", 
"陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章",
"云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦", 
"昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳",
"酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺", 
"倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
"乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余", 
"元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹"
]
var givenNames = [
"子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛", 
"昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊", 
"东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政", 
"美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建", 
"建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋", 
"涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅", 
"子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡", 
"佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕", 
"佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵", 
"清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"
]


const getRandoms = function  (min, max){
  return Math.floor(Math.random() * (max-min)+min)
}

const createName = function  () {
  const _index = getRandoms(0, 100)
  return `${familyNames[_index]}${givenNames[_index]}`
}
const createId = function () {
        return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
      }
export { getRandom, getUID, setToken, localData, sessionData, getRandoms, createName, createId};
