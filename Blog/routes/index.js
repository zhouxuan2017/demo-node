var express = require('express');
var router = express.Router();
router.use(express.static(__dirname))
router.get('/', function(req, res) {
   res.sendFile(__dirname+'/login.html') ;
});
router.post('/login',function(req,res){
  res.status=200;
  })
module.exports = router;
