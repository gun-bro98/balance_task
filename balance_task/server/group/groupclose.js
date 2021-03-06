const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");
var http = require('http');
var url = require('url');
const moment=require("moment");

let groupclose= (req, res, next) => {
    console.log("====================================================groupend 함수 호출됨===================================");
    let paramgroup_name=req.body.group;
    let paramgroup_member=req.body.group_members;
    let paramleader=req.body.send_user_id;

    console.log(req.body);

    // for(i=0;i<paramgroup_member.length;i++){
    //   console.log(paramgroup_member[i].id);
    //   var member=paramgroup_member[i].id;
    //   const sql8="select count(aram_no) from aram"
    //     sql.pool.query(sql8,(err,rows,fields)=>{
    //     var no=rows[0]['count(aram_no)']+1;    
    //     var time=moment().format('YYYY-MM-DD HH:mm:ss');

    //     var data = {aram_no:no, senduser:paramleader, receiveuser:member, group:paramgroup_name, sendtime:time, content:2, notsend:1 };
    //       console.log(data);
    //     const sql9 = "insert into aram set ?; ";
    //     //const sql2 = "SELECT * FROM vote; ";
    //     sql.pool.query(sql9,data, (err, rows, fields) => {
    //     if (err) {
    //     console.log(err);
    //     console.log("이미 등록되어거나 리더입니다.");
    //     } else { 
          
    //     console.log("aram 종료 문자 발신");
    //     }
        
    //     });//sql
    //   });  
    // }
    

    var sql1="delete from vote where group_name=?";
    sql.pool.query(sql1,paramgroup_name,(err,rows,fields)=>{
        if (err) {
          console.log(err);
          } else { 
            
          console.log("vote 삭제");
          }
      });

    // var sql2="delete from chat where group_name=?";
    // sql.pool.query(sql2,paramgroup_name,(err,rows,fields)=>{
    //     if (err) {
    //       console.log(err);
    //       } else { 
            
    //       console.log("vote "+paramgroup_name+" 삭제");
    //       }
    //   });

    var sql2="delete from chat where group_name=?";
    sql.pool.query(sql2,paramgroup_name,(err,rows,fields)=>{
        if (err) {
          console.log(err);
          } else { 
            
          console.log("chat "+paramgroup_name+" 삭제");
          }
      });

    var sql3="delete from groupboard where info_groupname=?";
    sql.pool.query(sql3,paramgroup_name,(err,rows,fields)=>{
        if (err) {
          console.log(err);
          } else { 
            
          console.log("groupboard "+paramgroup_name+" 삭제");
          }
      });

      var sql4="delete from groupnotice where info_groupname=?";
      sql.pool.query(sql3,paramgroup_name,(err,rows,fields)=>{
        if (err) {
            console.log(err);
            } else { 
         
            console.log("groupnotice "+paramgroup_name+" 삭제");
            }
        }); 

        var sql7="delete from groupusers where group_name=?";
        sql.pool.query(sql7,paramgroup_name,(err,rows,fields)=>{
          if (err) {
              console.log(err);
              } else { 
           
              console.log("groupusers "+paramgroup_name+" 삭제");
              }
        });   

        var sql5="delete from groupcalendar where group_name=?";
        sql.pool.query(sql5,paramgroup_name,(err,rows,fields)=>{
          if (err) {
              console.log(err);
              } else { 
           
              console.log("groupcalendar "+paramgroup_name+" 삭제");
              }
        }); 
        
        var sql6="delete from `groups` where group_name=?";
        sql.pool.query(sql6,paramgroup_name,(err,rows,fields)=>{
          if (err) {
              console.log(err);
              } else { 
           
              console.log("groups "+paramgroup_name+" 삭제");
              }
              req.groupname=paramgroup_name;
            
        }); 

        var sql8="update `groups` set `groups`.group_no=(select group_no-1 from `groups` as s1 where s1.group_no>(select group_no from `groups` as s2 where s2.group_name='"+paramgroup_name+"') ) where `groups`.group_no >(select group_no from `groups` as s3 where s3.group_name='"+paramgroup_name+"');";
        sql.pool.query(sql8,(err,rows,fields)=>{
          if (err) {
              console.log(err);
              } else { 
           
              console.log("groups "+paramgroup_name+" 수정");
              }
              req.groupname=paramgroup_name;
            next();
        }); 
};

module.exports= {groupclose};
