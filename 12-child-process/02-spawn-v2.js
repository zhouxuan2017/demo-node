#!/usr/bin/node

const cp=require('child_process');

console.log('I am father with id:',process.pid);
var child=cp.spawn('./02-child.js',[],{'detached':true,'stdio':['ignore',1,2]});
//child.stdout.pipe(process.stdout);
//child.stderr.pipe(process.stderr);

global.setTimeout(function(){
  console.log('father bye!');
  process.exit();
},5000);
