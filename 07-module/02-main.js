#!/usr/bin/node

var circle=require('./02-export-object-v2.js');
console.log('r=10,circle area:',circle.area(10));
console.log('r=10,circle diameter:',circle.diameter(10));





/*const p=require('./02-export-var');

console.dir(module);
console.log(p);*/


/*const circle=require('./02-export-function.js');
console.log('r=10,circle area:%d',circle(10).area());
console.log('r=10,circle circumference:%d',circle(10).circumference());
console.dir(module);*/



/*const circle=require('./02-export-object.js'),
      log=console.log;
log('r=10,circle diameter:',circle.diameter(10));
log('r=10,circle area:',circle.area(10));
console.dir(module);*/

