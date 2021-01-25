const { exists } = require('fs');
const { connect } = require('http2');
var mysql = require('mysql');
const { parentPort } = require('worker_threads');
var client = mysql.createConnection({
    host:'localhost',
    port:"3306",
    user:'root',
    password:'19980108',
    database:'Library'
});
client.connect(function(err){
    if(err){
        console.log('[query]-:'+err);
        return;
    }
    console.log("[connection connect]连接成功");
});
client.query('use library');
function Insert(addsql,para){ //向数据添加记录
    client.query(addsql,para,function(err,res){
    if(err) console.log("err"+err);
    console.log("-------------插入记录-----------------");
    //console.log('插入记录的id'+res.insertId);
    console.log('插入结果'+res);
    });
}
function Show(){ //展示数据库
    client.query('select * from books',function(err,res,fileds){
    if(err){
        console.log('查询语句有误');
    }else{
        console.log(res);
    }
    });
}
function Update(updatesql,update_para){ //修改数据
    client.query(updatesql,update_para,function(err,res){
        if(err) console.log("err"+err);
        console.log("-------------修改记录-----------------");
        console.log('修改影响的行数'+res.affectedRows);
        console.log('修改改变的行数'+res.changedRows);
        });
}
function Exit(){ //退出数据库
    client.end();
}
//添加数据样式表
var addsql = 'insert into books (bookname,author,press) values(?,?,?)'; 
var para = ['<演员的自我修养>','李建国','西安交通大学出版社'];
//修改数据样式表
var updatesql = 'update books set bookname = ?,author = ?,press = ? where id =?';
var update_para = ['<jquery 开发实战>','刘tony','清华大学出版社',6];
//Insert(addsql,para);
exports.insert = Insert;