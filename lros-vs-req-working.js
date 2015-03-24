"use strict";

console.log('echo pid ' + process.pid);
var vsm = require('lrs/virtualServerModule');
var os = require('os');
var body = 'qwerty';
var onRequest= function(servReq, servResp, cliReq) {
  servReq.addHeader('foo', 'bar');
//  servReq.bindHeaders(cliReq);
//  response.Header('foo', 'bar');
//  servResp.writeHead(200, {
//  'Content-Length': body.length,
//  'Content-Type': 'text/plain' });
  cliReq();
  console.log('echo echo');
};

var onExist = function(vs) {
  vs.on('request', onRequest);
  console.log('echo forward proxy ' + vs.id);
};
vsm.on('exist', 'vs1', onExist);
