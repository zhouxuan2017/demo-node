#!/usr/bin/node

const  http = require('http'),
       fs=require('fs');

http.createServer((req, res) => {
   // console.log(req.url) ;
    if(req.url==='/favicon.ico') return ;
    var fileName=__dirname+req.url;
    console.log(fileName);
    fs.createReadStream(fileName).pipe(res);
//    res.end('hello world');
    res.end(fs.readFileSync(fileName));

}).listen(8080);
console.log(process.pid);
