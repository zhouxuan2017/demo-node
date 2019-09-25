#!/usr/bin/node

const cp=require('child_process');

cp.execFile('./02-child.js',[],function(err,out,error){
  if(err){
    console.error(message);
    process.exit(1);
  }
   console.log(out);

});
