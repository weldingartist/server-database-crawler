var fs = require('fs');
var http = require('http');
http.createServer(function(req,res){
    fs.readFile('./index.html',function(err,data){
        if(err){
            console.log('err'+err);
        }
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
}).listen(5222,function(){
    console.log("服务器在5222端口监听");
});