const superagent = require('superagent');
const cheerio = require('cheerio');
const { each } = require('async');
const { exists } = require('fs');
const { connect } = require('http2');
var mysql = require('mysql');
const database = require('./database');
const { parentPort } = require('worker_threads');
const items = [];
function pc(){
    const promise = new Promise(function(resolve,reject){
        superagent
        .get('127.0.0.1:5222')
        .end((err,res)=>{
            if(err)
            {
                console.log(err);
            }
            if(res){
                let result = [];
                let $ = cheerio.load(res.text);
                let t = $('tr');
                let tt = t.children();  
                tt.each(function(){
                   result.push($(this).text());
                });
                for(let i=0;i<4;i++){
                    items[i] = result.slice(0+3*i,3+3*i);
                }   
                resolve(); 
            }
        });
    });
    return promise;
}
pc().then(function(){
    console.log(items);
    let addsql = 'insert into books (bookname,author,press) values(?,?,?)';
    let para = items[1];
    database.insert(addsql,para);
});      
