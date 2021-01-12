import axios from "axios";
import merge from "lodash/merge";
import qs from "qs";
// import Element from "element-ui";
import store from "../store";

// 环境的切换
if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "";
} else if (process.env.NODE_ENV === "debug") {
  axios.defaults.baseURL = "";
} else if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "";
}
axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data";

/**
 * 实例化
 * config是库的默认值，然后是实例的 defaults 属性，最后是请求设置的 config 参数。后者将优先于前者
 */
const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true // 表示跨域请求时是否需要使用凭证
});

/**
 * 请求拦截   621430164879271
 */
http.interceptors.request.use(
  function(config) {
    store.commit("setLoading", true);
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

/**
 * 状态码判断 具体根据当前后台返回业务来定
 * @param {*请求状态码} status
 * @param {*错误信息} err
 */
const errorHandle = (status, err) => {
  switch (status) {
    case 401:
      break;
    case 404:
      // Element.Message({ message: "请求路径不存在", type: "error" });
      store.commit("setErrMsg", "请求路径不存在");
      break;
    default:
      console.log(err, "err");
      store.commit("setErrMsg", err.data);
  }
  store.commit("setLoading", false);
};
/**
 * 响应拦截
 */
http.interceptors.response.use(
  response => {
    if (response.status === 200) {
      store.commit("setLoading", false);
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      if (!window.navigator.onLine) {
        store.commit("setErrMsg", "你的网络已断开，请检查网络");
        // Element.Message({
        //   message: "你的网络已断开，请检查网络",
        //   type: "error"
        // });
      } else {
        store.commit("setErrMsg", "Network Error Timeout 10000 ...");
      }
      return Promise.reject(error);
    }
  }
);

/**
 * 请求地址处理
 */
http.adornUrl = url => {
  return url;
};

/**
 * get请求参数处理
 * params 参数对象
 * openDefultParams 是否开启默认参数
 */
http.adornParams = (params = {}, openDefultParams = true) => {
  var defaults = {
    t: new Date().getTime()
  };
  return openDefultParams ? merge(defaults, params) : params;
};

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = "json") => {
  var defaults = {
    t: new Date().getTime()
  };
  data = openDefultdata ? merge(defaults, data) : data;
  return contentType === "json" ? JSON.stringify(data) : qs.stringify(data);
};

/**
 * requstPostApi请求
 * @param {String} url [请求地址]
 * @param {Object} params [请求携带参数]
 */
http.requstPostApi = (url, params) => {
  return new Promise((resolve, reject) => {
    http
      .post(http.adornUrl(url), params)
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * requstGetApi请求
 * @param {String} url [请求地址]
 * @param {Object} params [请求携带参数]
 */
http.requstGetApi = (url, params) => {
  return new Promise((resolve, reject) => {
    http
      .get(http.adornUrl(url), { params: params })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * JsonPost请求
 * @param {String} url [请求地址]
 * @param {Object} params [请求携带参数]
 */
http.JsonPost = function(url, params) {
  return new Promise((resolve, reject) => {
    http
      .post(http.adornUrl(url), http.adornParams(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
export default http;
