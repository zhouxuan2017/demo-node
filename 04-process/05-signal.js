#!/usr/bin/node


const log=console.log;
log('process id:',process.pid);

process.stdin.resume();

process.on('SIGINT',()=>{
  console.log('you have pressed ctrl+C');
  process.exit();
})

process.on('SIGTSTP',()=>{
  console.log('you have pressed ctrl+Z');
  process.exit();
});
process.stdin.resume();//为了不让控制台输出
