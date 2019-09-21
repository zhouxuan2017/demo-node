#!/usr/bin/node

/*const fs=require('fs'),
      log=console.log;

var buf=fs.readFileSync('./nodejs-logo.bmp');

log('width:',buf.readInt32LE(0x12));
log('height:',buf.readInt32LE(0x16));
log('deepth:',buf.readUInt32LE(0x1c));*/
   
const fs   = require('fs'),
            file = process.argv[2],
                  log  = console.log;



try {
    var buf = fs.readFileSync('./nodejs-logo.bmp');

} catch(e) {
    console.error(e.message);
      process.exit(2);

}

if(buf.toString('ascii', 0, 2) === 'BM') {
    log('width:', buf.readInt32LE(0x12));
      log('height:', buf.readInt32LE(0x16));
        log('color depth:', buf.readUInt16LE(0x1c));

}
