#!/usr/bin/node


/*const  http = require('http'),
       log=console.log;

http.createServer((req, res) => {
  log(`${req.method} ${req.url} ${req.httpVersion}`)
  log('request headers:',req.headers);
  log();

  switch(req.url){
    case '/admin':

     var auth=req.headers.authorization;

   if(typeof auth!=='undefined'){
     var usr=getUserNamePwd(auth);
     if(usr.username==='ds'&&usr.password==='123')
     {
      showSecret(req,res);
     }
     else
     {
        showNormal(res);
     }}else{
       res.statusCode=401;
       res.setHeader('www-authenticate','basic');
       showNormal(res);
     }
      break;
    default:
       showNormal(res);
       break;
  }

  log('authorization',req.headers.authorization);

  var auth=req.headers.authorization;
  
    getUserNamePwd(auth);
  
  res.end('OK!');
}).listen(8080); 


function showNormal(res){
   res.end('hello! A good day!');
}
function showSecret(res,req){
   res.end('i am wangding with mobile 18231868912');
}
function getUserNamePwd(auth){
  log('authorization:',auth);
   if(typeof auth!=='undefined'){
    var  ath=auth.split(' ');
    if(ath[0]==='Basic'){
      var buf=new Buffer(ath[1],'base64');
      var usr=buf.toString('utf8').split(':')
      log('username:',usr[0]);
      log('password:',usr[1])
    }
}
return {
  username:usr[0],
    password:usr[1]
}
}*/

const server = require('http').createServer(),
      log    = console.log,
      assert = require('assert');

server.on('request', (req, res) => {
  log(`\n\n${req.method} ${req.url} HTTP/${req.httpVersion}`);
  log(req.headers);
  log();

  switch(req.url) {
    case '/':
      sendNormalMsg(res);
      break;

    case '/admin':
      sendSecretMsg(req, res);
      break;

    default:
      sendErrorMsg(res); 
  }
});

server.listen(8080);

function userNamePasswd(str) {
  var msg = str.split(' ');
  assert.equal(msg.length, 2, 'must to be 2');
  assert.equal(msg[0], 'Basic', 'must to be Basic');

  var account = Buffer.from(msg[1], 'base64');
  msg = account.toString('utf8').split(':');

  return {
    userName: msg[0],
    passWord: msg[1]
  };
}

function sendNormalMsg(res) {
  res.end('Good day!');
}

function sendSecretMsg(req, res) {
  if(req.headers.authorization) {
    var usr = userNamePasswd(req.headers.authorization);
    console.log('\nauth:', usr);

    if(usr.userName === 'wangding' && usr.passWord === '123') {
      res.end('OK! wangding\'s mobile number: 13582027613');
      return;
    }
  } 

  res.writeHead(401, {'WWW-Authenticate': 'Basic'});
  res.end('who you are?');
}

function sendErrorMsg(res) {
  res.statusCode = 404;
  res.end('404 Error, resource not found!');
}

