#!/usr/bin/node

const read=require('stream').Readable;

var r=new read();
r.push('hello\n');
r.push('world!');
r.push(null);

r.pipe(process.stdout);
