#!/usr/bin/node

const fs=require('fs'),
      lnk=process.argv[2];

console.log('%s -> %s',lnk,fs.readlinkSync(lnk));


