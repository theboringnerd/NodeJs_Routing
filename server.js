const net = require('net');
const express = require('express');
const app = express();
const Tools = require('./tools');
var tools = new Tools;


var localServer;
var clientList = [];
app.listen(8081, ()=> console.log('s_api_log: API on and started on port 8081'));


//GET
app.get('/user/:id', (req, res) => {
	//res.send(req.params);
	res.send("fetching user's information");

	//localServer.write(JSON.stringify(req.query)); 
});
app.get('/user/:id/transaction', (req, res) => {
	res.send("fetchiing user's transaction");
});


//POST
app.post('/user/:id/transaction/:type/', (req, res)=>{
	//type = refill, withdraw, transfer
	var id = req.params.id;
	var type = req.params.type;
	var amount = req.body.amount;
	//var number = req.body.number;
	var user = new User;
	try {
		user.find(id, user, (user)=>{
			if(!user.is_user()) return false;
			//TODO check if user has enough balance to complete the transaction

			var transaction = new Transaction;
			try {
				transaction.id = tools.generate_random_uuid();
				transaction.type = type;
				transaction.user_id = user.id;
				transaction.details = {"amount":amount, "clients":clients}
				transaction.create();
			}
			catch(error) {
				throw error;
			}
			switch(type) {
				case "refill":
				break;
				
				case "withdraw":
				break;

				case "transfer":
					var clients = [];
					clients = req.body.phonenumbers;
					var command = {"clients":clients, "amount":amount, "id":transaction.id};
					try {
						localServer.write(JSON.stringify(command));
						//TODO update user's amount to new amount
						//TODO create transaction in transaciton listings
					}
					catch(error)
						throw error;
				break;

				case "default":
				break;
			}
		});
	}
	catch(error)
		throw error;
});
app.post('/user/:id/transaction/:type/:service/', (req, res)=>{
});
app.post('/user/', (req, res)=>{
});


//PUT
app.put('/user/:id/:attribute/', (req, res)=>{
});

//DELETE
app.delete('/user/:id/', (req, res)=>{
});



//WEBSOCKET CONNECTION PROTOCOL
var serverConnection = net.createServer(function(client) {
	console.log("s_log: client just connected!");
	client.name = client.remoteAddress + ":" + client.remotePort;
	clientList.push(client);
	
	client.on('data', (data) => {
		try {
			var jsData = JSON.parse(data);
			if(jsData.id == "_____afkanerd_offline_server_8112018_____") {
				console.log("s_log: connected to Bianca!");
				localServer = client;
			}
		}
		catch(error) {
			//console.log("Exception with: " + e );
			throw error;
		}
	});
});


serverConnection.listen(8080, () => console.log("s_log: started websocket server on port 8080") );


