#!/usr/bin/node

console.log('file name:',__filename);
console.log('dir name:',__dirname);

//operate data file
var file = __dirname+"/data/db.xml";
console.log('file name:',file);

//windows data file
file = __dirname + "\\data\\db.xml";
console.log("file name in windows:",file);


const path=require('path');
fileName=path.join(__dirname,'views','login.html');
console.log('path join file name:',fileName);
