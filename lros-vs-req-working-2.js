var vsm = require('lrs/virtualServerModule');
var insertExampleHeader = function(servReq, servResp, cliReq) {
	servReq.addHeader ('foo', 'bar');
	cliReq();
};
var registerForRequest = function(vs) {
	vs.on('request', 'vs1', insertExampleHeader);
};
vsm.on('exist', registerForRequest);