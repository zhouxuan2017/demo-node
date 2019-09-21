#!/usr/bin/node

const fs=require('fs'),
     uid=process.argv[2],
     gid=process.argv[3],
     dst=process.argv[4];
fs.chownSync(dst,Number(uid),Number(gid));

