const http = require('http');
const fs = require('fs');
const assert = require('assert');
const qs = require('querystring');

http.createServer(function (req, res) {
    if (req.method === 'GET') {
        if (req.url === '/') {
            var a = JSON.stringify('请在url地址处输入/login实现跳转')
            res.writeHead(200, {"Content-type": 'text/html;charset="utf-8"'})
            res.end(a)
        }
        if (req.url === '/login') {
            fs.readFile('./login.html', 'utf-8', function (err, data) {
                if (err) {throw err;} 
                else {res.writeHead(200, {"Content-type": 'text/html'})}
                res.end(data);
            });
        }
    }
    else if (req.method === 'POST') {
        sendSecretMsg(req, res);
    }
    else {err(res)}
}).listen(8081, 'localhost')

function userNamePasswd(str) {
    var msg = str.split(' ');
    assert.equal(msg.length, 2, 'must to be 2');
    assert.equal(msg[0], 'Basic', 'must to be Basic');
    msg = Buffer.from(msg[1], 'base64').toString('utf8').split(':');
    return {
        username: msg[0],
        pwd: msg[1]
    }
}

function sendSecretMsg(req, res) {
    req.on('data', function (chunk) {
        var post = '';
        post += chunk;
        if (req.headers.authorization) {
            var usr = userNamePasswd(req.headers.authorization)
            if (usr.username === qs.parse(post).username && usr.pwd === qs.parse(post).pwd) {
                var count = 1;
                if (typeof req.headers.cookie !== 'undefined') {
                    var data = req.headers.cookie.split('=');
                    count = Number(data[1]) + 1;
                }
                res.writeHead(200, {
                    "Content-type": 'text/html;charset="utf-8"',
                    "Set-cookie": `count=${count}`
                })
                res.end(JSON.stringify('zhangsan这是您第' + count + '次登录'))
            }
            else {
                var a = qs.parse(post).username;
                var b = qs.parse(post).pwd;
                if (a === 'zhangsan' && b !== '123') {
                    res.writeHead(200, {"Content-type": 'text/html;charset="utf-8"'})
                    res.end(JSON.stringify('您输入的密码错误！'))
                }
                else if (a !== 'zhangsan' && b === '123') {
                    res.writeHead(200, {"Content-type": 'text/html;charset="utf-8"' })
                    res.end(JSON.stringify('您输入的用户名错误！'))
                }
                else {
                    res.writeHead(200, { "Content-type": 'text/html;charset="utf-8"'})
                    res.end(JSON.stringify('您输入的密码和用户名错误！'))
                }
            }
        }
    })
}
function err(res) {
    var msg = 'Not found!';
    res.statusCode = 404;
    res.setHeader('Content-Length', msg.length);
    res.setHeader('Content-Type', 'text/plain');
    res.end(msg);
  }