#!/usr/bin/node

const Write=require('stream').Writable;

function GreenStream(){
   Write.call(this);
}
GreenStream.prototype=Write.prototype;
GreenStream.prototype._write=function(chunk,encoding,callback){
   process.stdout.write('\033[1;32m' + chunk.toString('utf8') + '\033[1;37m');
  callback();
};
module.exports=GreenStream;
