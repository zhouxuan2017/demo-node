#!/usr/bin/node

const  http = require('http'),
       log=console.log;

//total  代表服务器被请求的总次数
var total=1;
http.createServer((req, res) => {
  log(`${req.method} ${req.url} ${req.httpVersion}`);
  log(req.headers);
  log();

  if(req.url==='/favicon.ico') return;
  log('I haved required %d times',total++);
  var count=1;
  if(typeof req.headers.cookie !=='undefined'){
    //解析cookie
    var data=req.headers.cookie.split('=');
    count=Number(data[1])+1;
 
  }
  res.statusCode=200;
  //放在请求体里面  下次传到客户端进行加一  在放入请求体  继而一直保持
  res.setHeader('Set-cookie',`count=${count}`);
    res.end(`you have visited ${count} times` );


}).listen(8080); 
