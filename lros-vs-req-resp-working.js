"use strict";

console.log('echo pid ' + process.pid);
var vsm = require('lrs/virtualServerModule');
var onRequest= function(servReq, servResp, cliReq) {
  servReq.addHeader('foo', 'bar');
  servResp.writeHead(404, {'Content-Type': 'text/html', 'foo': 'bar', 'PID': process.pid});
  cliReq();
  console.log('request fired');
};

var onExist = function(vs) {
  vs.on('request', onRequest);
  console.log('echo forward proxy ' + vs.id);
};
vsm.on('exist', 'vs1', onExist);
