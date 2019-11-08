const express=require('express'),
  app=express();
app.get('/todo',function(req,res){
  res.end('todo list');

})
app.listen(8080)
