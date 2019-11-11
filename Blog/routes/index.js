var express = require('express');
var router = express.Router();
router.use(express.static(__dirname))
router.get('/', function(req, res) {
   res.sendFile(__dirname+'/login.html') ;
});
router.get('/list',function(req,res){
  res.sendFile(__dirname+'/list.html')
})
router.post('/login',function(req,res){
    var post='';
    req.on('data',function(data){
      post+=data;
    })
    req.on('end',function(){
      if(JSON.parse(post).username=='zhangsan'&&JSON.parse(post).pwd=='123'){
        res.writeHead(200,{
          "Content-Type":"text/plain"
        });
        res.end('ok');
      }
      else
    {
      res.statusCode=404;
      res.end('No ok')
    }
    })
})
module.exports = router;
