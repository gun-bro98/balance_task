const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");
const { info } = require("console");
var http = require('http');
var url = require('url');
const moment=require("moment");


let aramsubmit= (req, res, next) => {
console.log("arma 허락 함수 호출됨");
    var paramSendId=req.body.senduser; 
    var paramgroup_name=req.body.groupname;
    var paramId=req.body.receiveuser;
    var paramno=req.body.no;
    var paramnotsend=req.body.notsend;
    
    console.log(req.body.no);
    
    const sql4="select max(board_number), s.group_no from groupboard g, `groups` s where g.info_groupname=s.group_name and g.info_groupname=?"
    sql.pool.query(sql4,paramgroup_name,(err,rows,fields)=>{
    console.log(rows);
    var no;
    var paramgroup_no;
    console.log(rows[0]['group_no']);
    if(paramnotsend==0){
      if(rows===undefined){
          no=0;
      }else{
          no=rows[0]['max(board_number)'];
          paramgroup_no=rows[0]['group_no'];
      }
      for(var i=1;i<no+1;i++){
        console.log(i);
        data2={board_number:i, user:paramSendId, group_name:paramgroup_name, discuss:0, group_no:paramgroup_no}
        console.log(data2);
        const sql5="insert into vote set ?"
        sql.pool.query(sql5,data2,(err,rows,fields)=>{
          if (err) {
            console.log(err);
            } else { 
              
            console.log("vote 등록");
            }
        })
      }
    }

    const sql6="delete from aram where aram_no=?"
      sql.pool.query(sql6,paramno,(err,rows,fields)=>{
        if (err) {
          console.log(err);
          } else { 
            
          console.log("삭제");
          }
      })

      if(paramnotsend===0){
      const sql7="select count(aram_no) from aram"
        sql.pool.query(sql7,(err,rows,fields)=>{
            var no=rows[0]['count(aram_no)']+1;    
            var time=moment().format('YYYY-MM-DD HH:mm:ss');
            
            var insertdata = {aram_no:no, senduser:paramId, receiveuser:paramSendId, group_name:paramgroup_name, sendtime:time, content:1, notsend:1 };
            const sql8="insert into aram set ?"
            sql.pool.query(sql8,insertdata,(err,rows,fields)=>{
                if (err) {
                console.log(err);
                } else { 
                    
                console.log("새알림 등록");
                }
            })
        })
      }
      // var votearray=[];
      // const sql10="select max(board_number) from groupboard where group_name=?"
      //   sql.pool.query(sql10,paramgroup_name,(err,rows,fields)=>{
      //       var no=rows[0]['max(board_number)'];    
      //     for(i=1;i<=no;i++){
      //       var insertdata = ("("+no +","+ 0 +",'"+ receiveuser +"','" +paramgroup_name +"')");

      //       votearray.push(insertdata);
      //     }
      //       var replaced = votearray.toString().replace(/\[.*\]/g,'');
      //       var str = replaced.replace(/\"/gi, "");

      //       const sql101="insert into vote(board_number,discuss,user,group_name) values "+str+";"
      //       sql.pool.query(sql101,(err,rows,fields)=>{
      //           if (err) {
      //           console.log(err);
      //           } else { 
                    
      //           console.log("새알림 등록");
      //           }
      //       })
      //   })
        
    const sql8="select group_no from `groups` where group_name=?"
    sql.pool.query(sql8,paramgroup_name,(err,rows,fieds)=>{
            console.log(rows);
            var groupno=rows[0]['group_no'];
    

            var data = {group_name:paramgroup_name, user:paramSendId, leader:0, group_no: groupno};

            const sql1 = "insert into groupusers set ?; ";
            //const sql2 = "SELECT * FROM vote; ";
            sql.pool.query(sql1,data, (err, rows, fields) => {
            if (err) {
            console.log(err);
            console.log("이미 등록되어거나 리더입니다.");
            } else { 
                
            console.log("grouppartcome");
            }
            next()
            });//sql
        });  
    })  
};

module.exports= {aramsubmit};
