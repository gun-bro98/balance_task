const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");

let arams= (req, res, next) => {
  console.log("grouppart 함수 호출됨");
  var paramjwt=req.cookies.user; 
  const sql3="select id from user where jwt=?"
  sql.pool.query(sql3,paramjwt,(err,rows,fields)=>{
    console.log(rows)
    var senduser=rows[0]['id'];
    console.log(req.body);
    let paramgroup_name = req.body.group;
      const sql4="select user from groups where groupname=?"
      sql.pool.query(sql4,paramgroup_name,(err,rows,fields)=>{
        console.log(rows);
        var receiveuser=rows[0]['user'];
        const sql5="select count(aram_no) from groups where groupname=?"
        sql.pool.query(sql5,paramgroup_name,(err,rows,fields)=>{
        var no=rows[0]['count(aram_no)']+1;    
        

        var data = {aram_no:no, senduser:senduser, receiveuser:receiveuser, group:paramgroup_name };

        const sql1 = "insert into aram set ?; ";
        //const sql2 = "SELECT * FROM vote; ";
        sql.pool.query(sql1,data, (err, rows, fields) => {
        if (err) {
        console.log(err);
        console.log("이미 등록되어거나 리더입니다.");
        } else { 
          
        console.log("aram come");
        }
        next()
        });//sql
      });    
    });
  });
};

module.exports= {arams};
