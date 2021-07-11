import axios from "axios";
import merge from "lodash/merge";
import qs from "qs";
import store from "../store";
import { getSessionVal, setSessionVal } from "@/utils";
import { refreshToken } from "@/api";
// token 自动更新
// 是否正在刷新的标志
window.isRefreshing = false;
// 判断token是否即将过期
const refreshTokenTime = 2; // 间隔为多久重新获取一次token单位为分钟（min）
function isTokenExpired() {
  let curTime = getSessionVal("token").split("_")[1];
  let expiresTime = new Date().getTime() - curTime;
  let minutesTime = new Date(expiresTime).getMinutes();
  if (
    (expiresTime >= 0 && minutesTime > refreshTokenTime) ||
    (expiresTime < 0 && Math.abs(expiresTime) <= 1200000)
  ) {
    return true;
  }
  return false;
}

// 环境的切换

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "";
} else if (process.env.NODE_ENV === "debug") {
  axios.defaults.baseURL = "";
} else if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "";
}

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data";

/**
 * 实例化
 */

const http = axios.create({
  timeout: 1000 * 6,

  withCredentials: true
});

/**

 * 请求拦截   621430164879271

 */

http.interceptors.request.use(
  config => {
    store.commit("setLoading", true);

    if (config.url !== "/api/token") {
      config.headers["Authorization"] = getSessionVal("token");
      if (isTokenExpired() && config.url !== "/api/refreshToken") {
        if (!window.isRefreshing) {
          window.isRefreshing = true;

          refreshToken().then(res => {
            if (res.data.code === 0) {
              window.isRefreshing = false;
              setSessionVal("token", res.data.data?.token);
            }
          });
        }
      } else {
        return config;
      }
    }

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
      store.commit("setErrMsg", err || "请求路径不存在");
      break;
    case 405:
      store.commit("setErrMsg", err || "Method Not Allowed");
      break;
    case 500:
      store.commit("setErrMsg", err || "Internal Server Error");
      break;
    default:
      store.commit("setErrMsg");
  }
  store.commit("setLoading", false);
};

// 防抖函数，设置时间段内只弹出一次弹框
function debounce(fn, wait) {
  let timerId = null;
  let flag = true;
  return function() {
    clearTimeout(timerId);
    if (flag) {
      fn.apply(this, arguments);
      flag = false;
      timerId = setTimeout(() => {
        flag = true;
      }, wait);
    }
  };
}

const authError = debounce(status => {
  errorHandle(status);
}, 3000);

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
      authError(response.status);
      return Promise.reject(response);
    } else {
      // 处理断网的情况

      if (!window.navigator.onLine) {
        store.commit("setErrMsg", "你的网络已断开，请检查网络");
      } else {
        store.commit("setErrMsg", "Network Error");
      }
      store.commit("setLoading", false);
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

  return contentType === "json" ? data : qs.stringify(data);
};

/**

 * requstPostApi请求

 * @param {String} url [请求地址]

 * @param {Object} params [请求携带参数]

 */

http.requstPostApi = (url, params, type = "json") => {
  return new Promise((resolve, reject) => {
    http

      .post(http.adornUrl(url), http.adornData(params, true, type))

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
        resolve(res.data.data);
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
