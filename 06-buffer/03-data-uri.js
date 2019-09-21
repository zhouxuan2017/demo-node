#!/usr/bin/node

const fs=require('fs'),
      log=console.log,
      http=require('http');

var data=fs.readFileSync('./qr-code.jpg').toString('base64');
//log(data);
var html=''
  + '<!DOCTYPE html>'
  + '<html lang="en">'
  + '<head>'
    + '<meta charset="UTiF-8">'
    + '<title></title>'
  + '</head>'
  + '<body>'
   + '<img src="data:image/jpg;base64,'+data+'">'
  + '</body>'
  +'</html>';
 
  http.createServer((req,res)=>{
    res.end(html);
  }).listen(8080);

