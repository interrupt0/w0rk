"use strict";

console.log('echo pid ' + process.pid);
var vsm = require('lrs/virtualServerModule');

var n = 30;
var onRequest= function(servReq, servResp, cliReq) {
  console.log('Stream fired');
  servResp.setHeader('Content-Type', 'text/html; charset=UTF-8');
  servResp.setHeader('Transfer-Encoding', 'chunked');
  var i = 0;
  var html =
    '<!DOCTYPE html>' +
    '<html lang="en">' +
        '<head>' +
            '<meta charset="utf-8">' +
            '<title>Chunked transfer encoding test</title>' +
        '</head>' +
        '<body>';
  servResp.write(html);
  html = '<h1>Chunked transfer encoding test</h1>';
  servResp.write(html);
  while (i < n) {
     timeOut(i, servResp);
    i++;
  }
  cliReq();
};
var onExist = function(vs) {
  vs.on('request', onRequest);
  console.log('echo forward proxy ' + vs.id);
};
vsm.on('exist', 'vs1', onExist);


function timeOut(i, servResp) {
  setTimeout(function(){
        console.log('This is a chunked response after ' + i + ' seconds.');
        var html = '<h5>This is a chunked response after ' + i + ' seconds.</h5>';
        servResp.write(html);
      }, i * 1000);
}
