const net = require('net');
const mysql = require('mysql');
const {spawnSync} = require('child_process');
const host = "142.93.174.197";

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
	//

	var payCameroon = mysql.createConnection({
		//connectionLimit : 100,
		host: "142.93.248.15",
		port: 3306,
		user: "root",
		password: "asshole",
		database: "TBLAB"
	});

	

	payCameroon.connect(function(err) {
		if(err) throw err;
		payCameroon.query("select * from patients", function(err, result) {
			if(err) throw err;
			console.log(result);
		});
		try{
			var jsData = JSON.parse(data);
			var number = jsData.number;
			var msg = jsData.msg;
			var cls = jsData.cls;

			const system_command = spawnSync('../mmcli_linux_tools/SMS/main', ['--send', '--number', number, '--message', msg, '--class', cls]);

			console.log("Terminal output\n" + system_command.output);
			console.log("Terminal return code: " + system_command.status);
		}
		catch(e) {
			console.log("error with sever information: " + e);
		}
		console.log("Connected!");

	});
});
server.on('end', function() {
	console.log("Disconnected from server!");
});
