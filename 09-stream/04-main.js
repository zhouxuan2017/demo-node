#!/usr/bin/node

const GreenStream=require('./04-green-stream.js'),
      stdin=process.stdin;

var g=new GreenStream();

stdin.resume();
stdin.pipe(g);

