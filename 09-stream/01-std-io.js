#!/usr/bin/node
const stdin=process.stdin,
      stdout=process.stdout;
//从暂停状态转换成处于流动状态
stdin.resume();

stdin.on('data',function(data){
   stdout.write(data.toString('utf8').toUpperCase());
});

