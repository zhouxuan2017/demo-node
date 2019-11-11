
const express = require('express');
const app=express();
app.use(express.static('.'))
app.get('/',function(req,res){
  res.sendFile(__dirname+'/login.html');
  
})
app.post('/',function(req,res){
   res.end(req.body) ;
})
app.listen(8080);
