#!/usr/bin/node

const  http = require('http'),
       url=require('url') 
       qs=require('querystring'),
       log=console.log;
var islogin=false;
http.createServer((req, res) => {
  log(`${req.method} ${req.url} ${req.httpVersion}`);
  log(req.headers);
  log();
  if(typeof req.headers.cookie !=='undefined'){
    //解析cookie
    var data=req.headers.cookie.split(';');
    log(data);
  }
  res.statusCode=200;
  res.setHeader('Set-cookie',['name=wangding;max-age=1000 ','mobile=257381999']);
  

    //req.url==='/login'
    //method===post
    //get username and password from request body
    //judge user is legal
    //is legal show home
    //not legal show login
    
    if(req.url==='/login' &&req.method==='post'){
      var user='';
      req.on('data',(data)=>{return user+=data});
      req.on('end',()=>{
        var usr=qs.parse(user);
        if(usr.username==='wangding'&&usr.password==='123')
      {
        islogin=true;
        res.setHeader('Set-cookie',`login=${islogin}`);
        showname(res);
        return;
      }else{

        islogin=false;
        showfalse(res);
        return;
      }
      });
    }

    //req.url==='logout'
    //method===get
    //logout show login page
    if(req.url==='/logout'&&req.method==='GET'){
      islogin=false;
      res.setHeader('Set-cooklie',`login=${islogin}`);
      showname(res);
      return;
    }


    //req.url==='other'
    //judge have logined
    //islogin show home page
    //not login show login page
    
  if(typeof req.headers.cookie !=='undefined'){
    //解析cookie
    var data=req.headers.cookie.split('=');
    islogin=data[1];
    if(islogin==='true'){
      showname(res)
    }else{
     showHome(res)
    }
  }else{
    showname(res);
  }
    
}).listen(8080);
function showHome(res){
  var html= '<!DOCTYPE html>'
  + '<html lang="en">'
  + '<head>'
    + '<meta charset="UTF-8">'
    + '<title>home</title>'
  + '</head>'
  + '<body>'
    + '<h1>Welcome!</h1>'
    + '<hr>'
    + '<a href="/logout">logout</a>'
  + '</body>'
  + '</html>'
           res.end(html);
}

function showname(res){
  var html= '<!DOCTYPE html>'
  + '<html lang="en">'
  + '<head>'
    + '<meta charset="UTF-8">'
    + '<title></title>'
  + '</head>'
  + '<body>'
  + '<form action="/login" method="post">'
    + 'user name:<input type="text" name="username"><br/>'
    + 'password:<input type="password" name="password"><br/>'
    + '<input type="submit" value="login">'
  + '</form>'
  + '</body>'
  + '</html>'
        res.end(html);
}

function showfalse(res){

  var html= '<!DOCTYPE html>'
  + '<html lang="en">'
  + '<head>'
    + '<meta charset="UTF-8">'
    + '<title></title>'
  + '</head>'
  + '<body>'
  +'<p>错误</p>' 
  + '</body>'
  + '</html>'
        res.end(html);
}
