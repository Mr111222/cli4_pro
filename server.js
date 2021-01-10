/*
 * @Author: your name
 * @Date: 2021-01-03 11:18:23
 * @LastEditTime: 2021-01-10 10:55:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cli4_pro\server.js
 */
const Koa = require("koa");
const cors = require("koa2-cors");
const server = new Koa();
const bodyParser = require("koa-bodyparser"); // 获取所有地址栏的参数(get, post , all)
const co = require("co-mysql");
var mysql = require("mysql");
const Router = require("koa-router");
const router = new Router();

server.use(bodyParser());
server.use(
  cors({
    origin: function() {
      return "*";
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"]
  })
);

// 连接 mysql
let conn = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Zz111222",
  port: "3306",
  database: "class_tab"
});

let db = co(conn);

server.context.db = db;

// get all
router.get("/api/list", async ctx => {
  let datas = await ctx.db.query("SELECT * FROM zz_test");
  ctx.response.body = datas;
});

// select id
router.get("/api/list/:id", async ctx => {
  let datas = await ctx.db.query(
    `SELECT * FROM zz_test WHERE ID =${ctx.params.id}`
  );
  if (datas) {
    ctx.body = { err: 0, message: "success", data: datas };
  } else {
    ctx.body = { err: 1, message: "error", data: datas };
  }
});

// add new data
router.post("/api/list/add", async ctx => {
  let datas = await ctx.db.query(
    "INSERT INTO zz_test (name, age, files, id) VALUES(?,?,?,?)",
    [
      ctx.request.body.name,
      ctx.request.body.age,
      ctx.request.body.files,
      ctx.request.body.id
    ]
  );
  if (datas) {
    ctx.body = { err: 0, message: "success" };
  } else {
    ctx.body = { err: 1, message: "error", data: datas };
  }
});

// updata list
let keys = ["id", "name", "age", "files"];
router.post("/api/list/updata", async ctx => {
  let datas = await ctx.db.query(
    `UPDATE zz_test SET ${keys.map(key => `${key}=?`).join(",")} WHERE id=?`,
    [
      ctx.request.body.id,
      ctx.request.body.name,
      ctx.request.body.age,
      ctx.request.body.files,
      ctx.request.body.id
    ]
  );
  if (datas) {
    ctx.body = { err: 0, message: "success" };
  } else {
    ctx.body = { err: 1, message: "error", data: datas };
  }
});

// del
router.get("/api/list/del/:id", async ctx => {
  let datas = await ctx.db.query(
    `DELETE FROM zz_test WHERE id=${ctx.params.id}`
  );
  if (datas) {
    ctx.body = { err: 0, message: "success" };
  } else {
    ctx.body = { err: 1, message: "error", data: datas };
  }
});

server.use(router.routes()).listen(9999, () => {
  console.log("服务器已经运行！");
});