#!/usr/bin/node

const  http = require('http'),
       url=require('url'),
       qs=require('querystring'),
     
       log=console.log;
var items=['eat'];
http.createServer((req, res) => {

  /*log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
  log(req.headers);
  log();*/

  function getHTML(){
    return ''
+'<!DOCTYPE html>'
 +'<html lang="en">'
 +'<head>'
   +'<meta charset="UTF-8">'
+'<title>TO DO list</title>'
+ '</head>'
+'<body>'
+'<h1>TODO List</h1>' 
  +'<ul>\n'
  +items.map(function(ite1m){return '<li>'+ite1m+'</li>';}).join('\n')
 + '</ul>'
  +'<form metho="GET" action="/">'
    +'<input type="text" name="item">'
    +'<input type="submit" value="提交">'
  +'</form>'
 +'</body>'
  +'</html>'
  }

  if(req.url==='/'){
    //200 ok
    res.writeHead(200,{"Content-Type":'text/html'});

    res.end(getHTML());
  }else{
    //404 not found
    var it=qs.parse(url.parse(req.url).query).item;
      log('req.url:',req.url);
      log('2:',url.parse(req.url));
      log('3',url.parse(req.url).query);
      log('4:',qs.parse(url.parse(req.url).query))
      log(it);
      if(typeof it !=='undefined'){
        items.push(it);
      }
      res.end(getHTML());
  }
    res.end('hello world');

}).listen(8080); 


