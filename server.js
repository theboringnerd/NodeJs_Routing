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
//app.use( bodyParser.json() );       // to support JSON-encoded bodies
/*app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); */
//app.use(express.json());       // to support JSON-encoded bodies
//app.use(express.urlencoded()); // to support URL-encoded bodies
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
			var charge = transaction.charge(amount);
			if(user.amount - (amount + charge) < 0) {
				res.send(JSON.stringify({"status":403, "msg":"NEB"}));
				return false;
			}
			try {
				transaction.id = tools.generate_random_uuid();
				transaction.type = type;
				transaction.user_id = user.id;
				transaction.details = {"amount":amount, "clients":clients, "charges":charge}
				transaction.create();
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
					var clients = [];
					clients = req.body.phonenumbers;
					amount += charge;
					var command = {"clients":clients, "amount":amount, "transaction_id":transaction.id};
					try {
						try {
							if(localServer !== undefined && localServer.id == "_____afkanerd_offline_server_8112018____") {
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
});


serverConnection.listen(8080, () => console.log("s_log: started websocket server on port 8080") );


