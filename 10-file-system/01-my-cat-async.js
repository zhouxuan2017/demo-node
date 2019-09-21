#!/usr/bin/node


const fs=require('fs'),
      file=process.argv[2]||__filename;
//回调函数  异步操作处理
fs.readFile(file,function(err,data){
  if(err){
    console.error(err.message);
    process.exit(1);
  }else{
   console.log(data.toString('utf8'));
}
});

