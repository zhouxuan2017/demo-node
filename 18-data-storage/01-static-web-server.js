#!/usr/bin/node

const  http = require('http'),
       fs=require('fs');
//如果请求的 url 中的文件不在内存缓存中
//读取磁盘上的文件，存入缓存
//将缓存中的文件内容发送给浏览器
//如果请求的 url 中的文件在内存缓存中
//直接将缓存中的文件内容发送给浏览器
var buf={};
http.createServer((req, res) => {
   // console.log(req.url) ;
    if(req.url==='/favicon.ico') return ;
    var fileName=__dirname+req.url;
    console.log(fileName);
    if(!fs.existsSync(fileName)) return;
   // fs.readFile(fileName);
//    res.end('hello world');
//  没有被读过放在自己定义的一个对象里面   已经读过直接从里面调用即可
    if(!buf[fileName]){
      console.log('read file');
       buf[fileName]  =fs.readFileSync(fileName);
    }
    res.end(buf[fileName]);

}).listen(8080);
console.log(process.pid);
