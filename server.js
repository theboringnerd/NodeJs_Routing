const net = require('net');
const express = require('express');
const app = express();
const port = 8081;


app.get('/message/send/', (req, res) => {
	res.send('Hello world');
	console.log("Checking for connections...");

	clientList[0].write("Someone talked the borigin hehe");
	
});
app.listen(port, ()=> console.log('TheBoring Express Activated!'));


var clientList = [];

var serverConnection = net.createServer(function(client) {
	client.write('TheBoring Server got your back!');

	clientList.push(client);
	
	/*
	 * client.on('data', (number) => {
		console.log("C_: " + number);
		client.write((parseInt(number) + 1).toString());
	}); */
});



serverConnection.listen(8080, () => {
	console.log("TheBoring Server Activated!!");
});
