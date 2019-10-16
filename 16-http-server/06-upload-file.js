#!/usr/bin/node

const  http = require('http'),
       url=require('url'),
       fs=require('fs'),
       qs=require('querystring'),
     
       log=console.log;
var items=['eat'];
http.createServer((req, res) => {

  log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
  log(req.headers);
  log();
  req.setEncoding('binary');
  var file='';
  req.on('data',(data)=>{
    file+=data;
  })
  req.on('end',()=>
    {
      //get file name
          var files = file.split('\r\n')[1].split(';');
      var filename = qs.parse(files[2].trim()).filename;
      filename = filename.slice(1, filename.length-1);
      log(filename);

      //get file data
      var filedata=file.split('\r\n')[4];
      log(filedata);

      //save file 
      fs.writeFileSync(filename, filedata, {'encoding': 'binary'});
                                       
  });
    res.end('OK!');

}).listen(8080); 


