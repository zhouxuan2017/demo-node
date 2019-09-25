#!/usr/bin/node

const util=require('util');
const logfoo=util.debuglog('foo');
const log=console.log;
log('hello from foo [%d]',[123]);
