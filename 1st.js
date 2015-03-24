console.log('script add-proxy-host starting on process ' + process.pid);
"use strict";
var fpm = require('lrs/forwardProxyModule');
var os = require('os');
var onRequest= function(servReq, servResp, cliReq) {
  servReq.addHeader('foo', 'bar');
//  servReq.bindHeaders(cliReq);
  serResp.setHeader('foo', 'bar');
  cliReq();
  console.log('foo');
};
var onExist = function(fp) {
  fp.on('request', onRequest);
  console.log('Forward Proxy ' + fp.id + ' exists.');
};
fpm.on('exist', 'fp1', onExist);
