#!/usr/bin/node


console.time('TEST');
longTask();
console.timeEnd('TEST');

function longTask(){
  var n=0;
  for(var i=0;i<10000;i++){
    for(var j=0;j<1000;j++)

    {
      n=i*j;
    }
  }
  return n;
}

