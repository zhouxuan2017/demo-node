#!/usr/bin/node

const  http = require('http'),
       log=console.log;

http.createServer((req, res) => {
  console.log('reqest method:',req.method);
      
      switch(req.method) {
            case 'GET':
               select(req, res);
               break;
            case 'POST':
               create(req, res);  
               break;
            case 'PUT':
              update(req, res);
               break;
            case 'DELETE':
              remove(req, res);
               break;
            default:
              res.end('Something Wrong!');
                                                                      
      }
}).listen(8080);

  function select(req, res) {
      res.end(req.method);

  }

  function create(req, res) {
      res.end(req.method);

  }

  function update(req, res) {
      res.end(req.method);

  }

  function remove(req, res) {
      res.end(req.method);

  }
