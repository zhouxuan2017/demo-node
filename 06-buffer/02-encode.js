#!/usr/bin/node

const log=console.log,
      usr=process.argv[2],
      pwd=process.argv[3];

if(process.argv.length!==4){
  console.error('命令行格式：cmd username password');
  process.exit(1);
}


log('usr:%s,pwd:%s',usr,pwd);

var buf=new Buffer(usr+':'+pwd);
log('base64:%s',buf.toString('base64'));


/*
 * if(process.grgv.length!==3){
 * console.error('命令行格式:cmd base64_string');
 * process.exit(1);
 * }
 *
 * const buf=new Buffer(process.argv[2],'base64');
 * const info=bug.toString('utf8').split(':');
 *
 * if(info.length!==2){
 * console.error('信息有误！');
 * process.exit(2);
 * }
 *
 * console.log('user name:%s\npassword:%s',info[0],info[1]);
 */



