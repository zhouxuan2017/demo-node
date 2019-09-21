#!/usr/bin/node
const MyReadable=require('./03-my-readable.js');
var r=new MyReadable();
r.pipe(process.stdout);
