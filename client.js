const net = require('net');
const {spawnSync} = require('child_process');
const host = "167.99.140.201";

var server;
try {
	server = net.connect({port: 8080, host: host}, function() {
		console.log("Connected to a server!");
		server.write(JSON.stringify({id:"_fuck_ya_mama_"}));
	});
}
catch(e) {
	console.log("connection error: " + e );
}

server.on('data', function(data) {
	console.log("sc_: " + data);
	//server.write((parseInt(data) + 1).toString());
	
	try{
		var jsData = JSON.parse(data);
		var number = jsData.number;
		var msg = jsData.msg;
		var cls = jsData.cls;

		const system_command = spawnSync('../mmcli_linux_tools/SMS/main', ['--send', '--number', number, '--message', msg, '--class', cls]);

		console.log("Terminal output\n" + system_command.output);
	}
	catch(e) {
		console.log("error with sever information: " + e);
	}
});
server.on('end', function() {
	console.log("Disconnected from server!");
});
