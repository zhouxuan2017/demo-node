#!/usr/bin/node

const fs=require('fs'),
      file=process.argv[2]||__filename;
const fid=fs.openSync(file,'r');
console.log(fs.readFileSync(fid).toString('utf8'));
fs.closeSync(fid);

