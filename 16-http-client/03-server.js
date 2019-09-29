#!/usr/bin/node

const  http = require('http'),
       log=console.log;

http.createServer((req, res) => {
    log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
    req.pipe(process.stdout);
    res.end('hello client!');
}).listen(8080); 
