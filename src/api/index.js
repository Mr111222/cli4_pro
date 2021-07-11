/*
 * @Author: zz
 * @Date: 2021-07-11 09:20:36
 * @LastEditors: zz
 * @LastEditTime: 2021-07-11 09:57:10
 */
import request from "@/http/request";
const getToken = () => {
  return request({
    url: "/api/token",
    method: "post"
  });
};

const refreshToken = () => {
  return request({
    url: "/api/refreshToken",
    method: "post"
  });
};

export { getToken, refreshToken };
