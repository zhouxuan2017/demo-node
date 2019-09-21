#!/usr/bin/node

const Read=require('stream').Readable;

function MyReadable(){
   Read.call(this);
 };

MyReadable.prototype=Read.prototype;
var c='a'.charCodeAt(0);

MyReadable.prototype._read=function(){
     this.push(String.fromCharCode(c++));
     if(c>'z'.charCodeAt(0)) this.push(null);
 };
module.exports=MyReadable;
