#!/usr/bin/node

const fs =require('fs'),
      file=process.argv[2]||__filename;
var source=fs.createReadStream(file);
source.pipe(process.stdout);
source.on('error',function(err){
  console.error(err.message);
});

