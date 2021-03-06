var express = require('express');
var router = express.Router();
const sql=require('../database/db_connect');
var group = require('../group_function/addgroup');
const bcrypt=require('bcrypt');
const moment = require("moment");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const multer = require("multer");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookie = require("cookie");

var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { cb(null, './upload')  },
    filename: function (req, file, cb) { cb(null, file.originalname)} 
  })
  
  
  const upload = multer({ storage: storage });

let boardupdate= (req, res, next) => {
    console.log("================================groupboardupdate함수 호출됨=======================================");
    console.log(req.body);
    console.log(req.body.historyData);
    //console.log("req.files:"+req.files);
    
    let urlgroup=req.body.group_name;
    let paramId=req.body.board_id;
    let paramcategory=req.body.category;
    let paramtitle="게시판";
    let paramimages=[];
    let paramcontent=req.body.content;
    let paramkind=req.body.kind;    //받아야 할값
    let paramdate=req.body.date;
    //let paramdate=req.body.board_number;
    for(i=0;i<req.files.length;i++){
        paramimages.push(`/image/${req.files[i].filename}`);
        //console.log("req.files[i].filename:"+req.files[i].filename);
    }
    //console.log("paramimages :"+paramimages);
    if(paramimages==null){
      paramimages=req.body.image;
    }
    
    //var sql1="update `groups` set (group_name,category,startdate,deadline,highlight,host,manager,content,group_images)=('"+paramgroup_name+"','"+paramcategory+"',"+paramstartdate+","+paramdeadline+",'"+paramhighlight+"','"+paramhost+"','"+parammanger+"','"+paramcontent+"','"+paramgroup_images+"') where group_name='"+paramgroup_name+"');"
    if(paramcategory=='타임라인'){
    var sql1="update groupboard set title='"+paramtitle+"', text='"+paramcontent+"' where board_number="+paramId+" and info_groupname='"+urlgroup+"';"
      sql.pool.query(sql1,(err,rows,fields)=>{
          if (err) {
              console.log(err);
            } else {
              console.log("성공");

            }
      })   
  }

  if(paramcategory=='공지사항'){
    var sql1="update groupnotice set title='"+paramtitle+"', text='"+paramcontent+"' where board_number="+paramId+" and info_groupname='"+urlgroup+"';"
      sql.pool.query(sql1,(err,rows,fields)=>{
          if (err) {
              console.log(err);
            } else {
              console.log("성공");

            }
      })   
  }
    
    next();
}
module.exports= {boardupdate};