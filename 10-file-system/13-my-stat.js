#!/usr/bin/node

const fs=require('fs'),
      dst=process.argv[2];

console.log(fs.statSync(dst));


