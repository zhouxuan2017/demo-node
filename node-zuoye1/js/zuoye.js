#!/usr/bin/node

const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
     qs = require('querystring');


     var items = [];

http.createServer(function (req, res) {
  
    if (req.url != '/') { return err(res); }

    //   console.log(req.headers);
    //   console.log('');

    switch (req.method) {
        case 'GET':
            show(req, res);
            break;
        case 'POST':
            add(req, res);
            break;

        default:
            err(res);
            break;
    }
}).listen(8083, 'localhost');

function err(res) {
    var msg = 'Not found';
    res.writeHead(404, {
        'Content-Length': msg.length,
        'Content-Type': 'text/plain'
    });
    res.end(msg);
}
var item=['list']
function show(req, res) {
    qs.parse(url.parse(req.url).query).item
    console.log(req.route)
 if(req.url=='/')
 {
   
    var html = fs.readFileSync('.././chapter.html').toString('utf8'),
    
    items_html = items.map(function(item) {return '      <li>' + item + '</li>';}).join('\n');
items.push('list')
html = html.replace('%', items_html); 

res.writeHead(200, {
  'Content-Type': 'text/html',
  
  'Access-Control-Allow-Origin': '*'

});

res.end(html);
 }
 

    // if (path.extname(pathname) == '') {
    //     pathname += '/'
    // }
    // if (pathname.charAt(pathname.length - 1) == '/') {
    //     pathname += '.././chapterList.html'
    // }
    // path.exists(pathname, function (exists) {
    //     if (exists) {
    //         switch (pathname) {
    //             case '.html':
    //                 res.writeHead(200, {
    //                     'Content-Type': 'text/html',
    //                     'Access-Control-Allow-Origin': '*'
    //                 });
    //             case '.css':
    //                 res.writeHead(200, {
    //                     'Content-Type': 'text/css',
    //                     'Access-Control-Allow-Origin': '*'
    //                 });
    //             case '.js':
    //                 res.writeHead(200, {
    //                     'Content-Type': 'text/js',
    //                     'Access-Control-Allow-Origin': '*'
    //                 });
    //             case '.jpg':
    //                 res.writeHead(200, {
    //                     'Content-Type': 'image/jpg',
    //                     'Access-Control-Allow-Origin': '*'
    //                 });
    //             case '.png':
    //                 res.writeHead(200, {
    //                     'Content-Type': 'image/png',
    //                     'Access-Control-Allow-Origin': '*'
    //                 });
    //             default:
    //                 res.writeHead(200, { "Content-Type": "application/octet-stream" });
    //         }
    //         fs.readFile(pathname,function (err,data){
    //             res.end(data);
    //     })
  
  


// })
}


function add(req, res) {
    var body = '';

    req.on('data', function (chunk) { body += chunk; });
    req.on('end', function () {
        var item = qs.parse(body).item;
        if (item !== '') { items.push(item); }

        show(res);
    });
}