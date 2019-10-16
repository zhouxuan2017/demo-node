#!/usr/bin/node

const  http = require('http'),
       
       qs=require('querystring'),
     
       log=console.log;
var items=['eat'];
http.createServer((req, res) => {

  log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
  log(req.headers);
  log('');

  function getHTML(){
    return ''
+'<!DOCTYPE html>'
+' <html lang="en">'
 +'<head>'
   +'<meta charset="UTF-8">'
+'<title>TO DO list</title>'
+ '</head>'
+'<body>'
+'<h1>TODO List</h1>'
  +'<ul>'
  +items.map(function(item){return '<li>'+item+'</li>';}).join('\n')
 + '</ul>'
  +'<form metho="POST" action="/">'
    +'<input type="text" name="item">'
    +'<input type="submit" value="提交">'
  +'</form>'
 +'</body>'
  +'</html>'
  }

  if(req.method==='GET'&&req.url==='/'){
    //200 ok
    res.writeHead(200,{"Content-Type":'text/html'});

    res.end(getHTML());
  }else if(req.method==='POST'&&req.url==='/'){
    //404 not found
    //submit data
    var it='';
    req.on('data',(data)=>{
      it+=data;
    });
    req.on('end',()=>{  
    if(typeof it.item !=''){
        items.push(qs.parse(it).item);
      }
      res.end(getHTML());

  })
  }else
  {
    //error
    res.end('error');
  }
    res.end('hello world');

}).listen(8080); 


