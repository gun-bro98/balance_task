const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
//동호
let auth = (req, res, next) => {
  //인증 처리를 할 코드를 넣어야 한다
  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.user;
  const sql1 = "SELECT * FROM user";
  sql.pool.query(sql1, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(rows);
      rows.forEach((info) => {
        if (info.jwt === token) {
          //isUser = true;
          console.log("true");
          req.token = token;
          req.id = info.id;
          req.name=info.name;
          req.evaluation_score=info.evaluation_score;
          req.evaluation_text=info.evaluation_text;
          req.clear_group=info.clear_group;
          req.user_image=info.user_image;
          req.introduce=info.introduce;
          req.user_category=info.user_category;
          isAuth=true;

          //req.user = user;
          next();
          console.log("json true");
          //return res.json({ isAuth: true, error: false });
        } else {
          //console.log("err");

          return;
        }
      });
    }
  });
};

module.exports = { auth };