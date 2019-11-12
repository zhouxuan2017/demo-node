var express = require('express');
var router = express.Router();
var arr=require('./data.json')
var chapter=arr.chapterList;
var user=arr.users;

router.use(express.static(__dirname))
router.get('/', function(req, res) {
   res.sendFile(__dirname+'/login.html') ;
});
//post请求判断登录名密码
router.post('/login',function(req,res){
  if(req.body.username==user[0].username&&req.body.pwd==user[0].password)
  {
    res.sendFile(__dirname+'/list.html')
  }
  else{
    res.sendFile(__dirname+'/error.html')
  }
})

//list
router.get('/list',function(req,res){
  res.sendFile(__dirname+'/list.html')
})

//增加chapterlist
router.get('/add',function(req,res){
    var bb = JSON.stringify(chapter);
  res.writeHead(200, {
      'Content-Length': Buffer.byteLength(bb),
      'Content-Type': 'text/plain;charset="utf-8"'
  })
  res.end(bb)
})
module.exports = router;
