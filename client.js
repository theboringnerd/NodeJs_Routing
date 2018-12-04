const net = require('net');
const host = "127.0.0.1";

var server = net.connect({port: 8080, host: host}, function() {
	console.log("Connected to a server!");

});
server.on('data', function(data) {
	console.log("sc_: " + data);
	server.write((parseInt(data) + 1).toString());
});
server.on('end', function() {
	console.log("Disconnected from server!");
});
