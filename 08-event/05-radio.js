#!/usr/bin/node

function Radio(station){
  var _listeners={
    // 'play':[fn1,fun2,fun3],  键值对
     //'stop':[]
  };
      setTimeout(()=>{
    emit('play',station);

   },0);
   setTimeout(()=>{
      emit('stop',station);
   },5000);

   function emit(evt,arg){
     if(typeof(_listeners[evt])==='undefined'){
       console.error('error:%s not defined',evt);
       process.exit(1);
     };
     _listeners[evt].forEach((fn)=>{
       fn.call(this,arg);
     });
   }
   this.on=(evt,fn)=>{
     if(typeof( _listeners[evt])==='undefined'){
       _listeners[evt]=[];
     }
     _listeners[evt].push(fn);
   };
}
module.exports=Radio;
