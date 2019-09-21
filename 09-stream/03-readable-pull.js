#!/usr/bin/node

const Read=require('stream').Readable;

var r=new Read();

var c='a'.charCodeAt(0);
r._read=()=>{
  //没有for循环  但是可以自动循环  read方法被标准输出流调用了26次
    r.push(String.fromCharCode(c++));
    if(c>'z'.charCodeAt(0)) r.push(null);
}
r.pipe(process.stdout);
