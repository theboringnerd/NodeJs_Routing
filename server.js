const net = require('net');
const express = require('express');
const app = express();
const port = 8081;


app.get('/message/send/', (req, res) => {
	var sms_query = {
		number:"652156811",
		msg:"theboringnerd online server",
		cls:1
	};
	res.send(sms_query);
	console.log("Checking for connections...");

	localServer.write(JSON.stringify(sms_query)); 
});
app.listen(port, ()=> console.log('TheBoring Express Activated!'));

var localServer;
var clientList = [];

var serverConnection = net.createServer(function(client) {
	client.write('TheBoring Server got your back!');

	client.name = client.remoteAddress + ":" + client.remotePort;
	client.write("Received you with: " + client.name );
	
	
	client.on('data', (data) => {
		try {
			var jsData = JSON.parse(data);
			if(jsData.id == "_fuck_ya_mama_") {
				console.log("FOUND LOCAL SERVER");
				localServer = client;
			}
		}
		catch(e) {
			//console.log("Exception with: " + e );
		}
	});
});



serverConnection.listen(8080, () => {
	console.log("TheBoring Server Activated!!");
});
