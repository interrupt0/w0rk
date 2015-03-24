"use strict";

console.log('echo pid ' + process.pid);
var vsm = require('lrs/virtualServerModule');
var onRequest= function(servReq, servResp, cliReq) {
  servReq.addHeader('foo', 'bar');
  servResp.setHeader('Content-Type', 'text/html; charset=UTF-8');
  servResp.setHeader('Transfer-Encoding', 'chunked');
  var html =
    '<!DOCTYPE html>' +
    '<html lang="en">' +
        '<head>' +
            '<meta charset="utf-8">' +
            '<title>Chunked transfer encoding test</title>' +
        '</head>' +
        '<body>';
  servResp.write(html);
  html = '<h1>Chunked transfer encoding test</h1>'
  servResp.write(html);
  // Now imitate a long request which lasts 5 seconds.
  setTimeout(function(){
  	html = '<h5>This is a chunked response after 5 seconds. The server should not close the stream before all chunks are sent to a client.</h5>'
      servResp.write(html);
    // since this is the last chunk, close the stream.
    html =
        '</body>' +
            '</html';
    servResp.end(html);
  }, 5000);
  // this is another chunk of data sent to a client after 2 seconds before the
  // 5-second chunk is sent.
  setTimeout(function(){
    html = '<h5>This is a chunked response after 2 seconds. Should be displayed before 5-second chunk arrives.</h5>'
      servResp.write(html);
  }, 2000);
//  servResp.writeHead(404, {'Content-Type': 'text/html', 'foo': 'bar', 'PID': process.pid});
  cliReq();
  console.log('request fired');
};
var onExist = function(vs) {
  vs.on('request', onRequest);
  console.log('echo forward proxy ' + vs.id);
};
vsm.on('exist', 'vs1', onExist);
