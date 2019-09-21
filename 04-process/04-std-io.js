#!/usr/bin/node

const mgs=['Name','QQ','Email','Mobile'];

var usr={},i=0;
console.log(mgs[0]);

process.stdin.on('data',function(data){
  usr[mgs[i]]=data.slice(0,data.length-1).toString('utf-8');
  if(i==mgs.length){
    process.exit();
  
  }
  console.log(mgs[i++]+':');
});

process.stdin.on('end',function(){
  console.log(usr);
})
