#!/usr/bin/node
const EventEmiter=require('events').EventEmitter;

var e =new EventEmiter();

setInterval(function(){
    e.emit('hello');
},1000)

setTimeout(function(){
   e.emit('bye');
},5000 )


e.on('hello',function(){
  console.log('hello event emit!');
})

e.on('bye',function(){
  console.log('goodbye!');
  process.exit();
})
