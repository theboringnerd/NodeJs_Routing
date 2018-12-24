const net = require('net');
const express = require('express');
const app = express();
const Tools = require('./models/tools');
const Transaction = require('./models/transaction.js');
const User = require('./models/user.js');
var bodyParser = require('body-parser');	
var tools = new Tools;


var localServer;
var clientList = [];
app.use(bodyParser.urlencoded({extended: false}));
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
	console.log(req.body);
	var id = req.params.id;
	var type = req.params.type;
	var amount = req.body.amount;
	var user = new User;
	try {
		user.find(id, user, (user)=>{
			if(!user.is_user()) return false;
			console.log("User Account Dets: " + user.phonenumber + " - " + user.id);
			var transaction = new Transaction;			
			var clients = [];
			clients = req.body.phonenumbers.split(",");
			var charge = transaction.charge(parseInt(amount) * parseInt(clients.length));	
			console.log("Charging - " + String(clients.length) + " clients with " + String(charge) + " for a sum of " + String(parseInt(amount) * parseInt(clients.length)));
			if(user.amount - (parseInt(amount) + charge) < 0) {
				res.send(JSON.stringify({"status":403, "msg":"NEB"}));
				return false;
			}
			try {
				transaction.id = tools.generate_random_uuid();
				transaction.type = type;
				transaction.user_id = user.id;
			}
			catch(error) {
				throw error;
			}
			switch(type) {
				case "refill":
				try {
					
				}
				catch(error) {}
				break;
				
				case "withdraw":
				break;

				case "transfer":
					amount += charge;

					transaction.details = {"amount":amount, "clients":clients, "charges":charge}
					transaction.create();
					var command = {"clients":clients, "amount":amount, "transaction_id":transaction.id};
					try {
						try {
							if(localServer !== undefined && localServer.id == "_____afkanerd_offline_server_8112018_____") {
								localServer.write(JSON.stringify(command));
								
								res.send(JSON.stringify({"status":201, "msg":"TC"}));
							}
							else 
								res.send(JSON.stringify({"status":500, "msg":"LSOFF"}));
						}
						catch(error) {
							throw error;
						}
					}
					catch(error) {
						throw error;
					}
				break;

				case "default":
				break;
			}
		});
	}
	catch(error) {
		throw error;
	}
});
app.post('/user/:id/transaction/:type/:service/', (req, res)=>{
});
app.post('/user/', (req, res)=>{
});


//PUT
app.put('/user/:id/:attribute/', (req, res)=>{
});
//app.put('/transaction/:id/

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
			if(jsData.id == "_____afkanerd_offline_server_8112018_____") { //_x5
				console.log("s_log: connected to Bianca!");
				localServer = client;
				localServer.id = "_____afkanerd_offline_server_8112018____"; 
			}
		}
		catch(error) {
			//console.log("Exception with: " + e );
			throw error;
		}
	});


	localServer.on('data', (data)=> {
		try {
			var ls_data = JSON.parse(data);
			switch(ls_data.type) {
				case "transaction":
					var transaction_id = ls_data.transaction_id;
					var stat = ls_data.status;
					var transaction = new Transaction;
					var transaction_callback = function(transaction) {
						if(!transaction.is_transaction()) {
							//would reflect failures and successes
							transaction.details = ls_data.transaction_details;
							transaction.stat = stat;
							transaction.update();
							switch(stat) {
								case "completed":
								break;

								case "failed":
									var user = new User;
									user.find(transaction.user_id, user, user_callback);
									var trans_dets = JSON.parse(transaction.details);
									var amount = trans_dets.amount;
									var charge = trans_dets.charge;
									user.amount += parseInt(amount) + parseInt(charge);
									user.update();
								break;
							}
						}

					}
					transaction.find(transaction_id, transaction, transaction_callback);
				break;

				default:
				break;
			}
		} 
		catch(error) {
			throw error;
		}
	});
});


serverConnection.listen(8080, () => console.log("s_log: started websocket server on port 8080") );


