#!/usr/bin/node

const EventEmitter=require('events').EventEmitter;

function Dog(name,energy){
  var _name,_energy;
  var that=this;

  EventEmitter.call(this);

  _name=name;
  _energy=energy;

  var timer=setInterval(()=>{
    if(_energy>0){
      that.emit('bark');
      _energy--;
    }else{
      clearInterval(timer);
    }
  },1000)

  this.getName=()=>_name;
  this.getEnergy=()=>_energy;
}
//yuanxingjicheng
Dog.prototype=EventEmitter.prototype;
//导出函数
module.exports=Dog;
