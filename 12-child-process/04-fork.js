#!/usr/bin/node

const cp=require('child_process');

console.log('I am father with id:',process.pid);
var child=cp.fork('./02-child.js',['04-fork.js']);
//child.stdout.pipe(process.stdout);
//child.stderr.pipe(process.stderr);

//父子进程分离
/*
global.setTimeout(function(){
  console.log('father bye!');
  process.exit();
},5000);*/
cp.fork('./02-child.js');
global.setTimeout(function(){
 child.send('hello,I am your father!');
 },2000);
