#!/usr/bin/node

console.log('file name:',__filename);
console.log('dir name:',__dirname);

//operate data file
//linux系统
var file = __dirname+"/data/db.xml";
console.log('file name:',file);

//windows data file
//windows32系统
file = __dirname + "\\data\\db.xml";
console.log("file name in windows:",file);

//最方便快捷的方法最实用的方法
const path=require('path');
fileName=path.join(__dirname,'views','login.html');
console.log('path join file name:',fileName);
