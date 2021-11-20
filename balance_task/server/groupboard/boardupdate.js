var express = require('express');
var router = express.Router();
const sql=require('../database/db_connect');
var group = require('../group_function/addgroup');
const bcrypt=require('bcrypt');
const moment = require("moment");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

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
    console.log("groupboard  update함수 호출됨");
    console.log(req.body);

    let paramcategory=req.body.category;
    let urlgroup=req.body.group;
    let paramId=req.body.id;
    let paramtitle="게시물";
    let paramimages=[];
    let paramtext=req.body.content;
    //받아야 할값
    let paramdate=req.body.date;
    let paramdate=req.body.board_number;
    for(i=0;i<req.files.length;i++){
        paramimages.push(`/image/${req.files[i].filename}`);
    }
    
    //var sql1="update `groups` set (group_name,category,startdate,deadline,highlight,host,manager,content,group_images)=('"+paramgroup_name+"','"+paramcategory+"',"+paramstartdate+","+paramdeadline+",'"+paramhighlight+"','"+paramhost+"','"+parammanger+"','"+paramcontent+"','"+paramgroup_images+"') where group_name='"+paramgroup_name+"');"
    var sql1="update groupboard set title'"+paramtitle+"',category='"+paramcategory+"',text='"+paramtext+"',image='"+paramimages+"',date='"+paramdate+"' where board_number='"+req.body.board_number+"';"

    sql.pool.query(sql1,(err,rows,fields)=>{
        if (err) {
            console.log(err);
          } else {
            console.log("성공");

          }
    })   
    next();
}