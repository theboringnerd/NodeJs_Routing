var User = require('./user.js');
var Transaction = require('./transaction.js');
var Tools = require('./tools.js');
var tools = new Tools;

var args = process.argv.slice(2);

switch(args[0]) {
	case "users":
	case "user":
		var user_callback = function(user) {
			console.log("==user==");
			console.log(user);
			if(user.is_user())
				console.log("\tTrue");
			else 
				console.log("\tFalse");
		}

		switch(args[1]) {
			case "auth":
				console.log("t_log: authenticating user");
				var user = new User;
				user.phonenumber = "000000000";
				user.password = "asshole";
				user.auth(user, user_callback);
			break;

			case "create":
				console.log("t_log: creating user");
				var user = new User;
				user.phonenumber = "000000000";
				user.password = "asshole";
				if(user.create())
					console.log("\tTrue");	
				else 
					console.log("\tFalse");
			break;

			case "update":
				console.log("t_log: updating user");
				var user = new User;
				//user.find("0", user, user_callback);
				user.id = "dcafc974-f59a-4c99-bf73-3c213ee4e360";
				user.amount = "1000";
				user.phonenumber = "111111111";
				user.password = "u_asshole";
				if(user.update(user, user_callback)) 
					console.log("\tTrue");
				else
					console.log("\tFalse");
			break;
			
			case "delete":
				console.log("t_log: deleting user");
				var user = new User;
				user = user.find("0", user, user_callback);
				if(user.del())
					console.log("\tTrue");
				else
					console.log("\tFalse");
			break;

			case "find":
				console.log("t_log: finding user");
				var user = new User;
				user.find("0", user, user_callback);
			break;

			case "is_user":
				console.log("t_log: is a user");
				var user = new User;
				user.find("0", user, user_callback);
				if(user.is_user())
					console.log("\tTrue");
				else
					console.log("\tFalse");
			break;

			case "all":
				var user = new User;
			break;

			default:
			console.log("invalid actions for user");
			break;
		}
	break;

	case "transaction":
	case "transactions":
		var transaction_callback = function(transaction) {
			console.log("==transaction==");
			console.log(transaction);
			if(transaction.is_transaction())
				console.log("\tTrue");
			else
				console.log("\tFalse");
		}

		switch(args[1]) {
			case "create":
				console.log("t_log: creating transaction");
				var transaction = new Transaction;
				transaction.user_id = "0";
				transaction.type = 'refill';
				//transaction.service = 'mobile_money';
				transaction.details = {"amount":500};
				if(transaction.create())
					console.log("\tTrue");
				else
					console.log("\tFalse");
			break;

			case "update":
				var transaction = new Transaction;
				//transaction.find("0", transaction, transaction_callback);
				transaction.id = "0";
				transaction.type = 'withdraw';
				transaction.stat = 'completed';
				if(transaction.update())
					console.log("\tTrue");
				else
					console.log("\tFalse");
			break;
			
			case "delete":
				var transaction = new Transaction;
				transaction.find("0", transaction, transaction_callback);
				if(transaction.del())
					console.log("\tTrue");
				else
					console.log("\tFalse");
			break;

			case "find":
				var transaction = new Transaction;
				transaction.find("0", transaction, transaction_callback);
			break;

			case "find_user":
				var transaction = new Transaction;
				var user_id = "0";
				transaction.find_user("0", transaction, transaction_callback);
			break;

			case "is_transaction":
				var transaction = new Transaction;
				transaction.find("0", transaction, transaction_callback);
				if(transaction.is_transaction())
					console.log("\tTrue");
				else
					console.log("\tFalse");
			break;

			case "charges":
				var transaction = new Transaction;
				if(transaction.charge(5001) == 150)
					console.log("\tTrue");
				else
					console.log("\tFalse");
			break;

			case "cash_in":
				var transaction = new Transaction;
				transaction.user_id = "0";
				transaction.amount = "100";
				transaction.cash_in(transaction_callback);
			break;

			case "all":
				var transaction = new Transaction;
			break;

			default:
			console.log("invalid actions for transaction");
			break;
		}

	break;


	case "uuid":
		console.log(tools.generate_random_uuid());
	break;
	
	case "all":
		var transaction = new Transaction;
		var user = new User;
	break;

	default:
	console.log("invalid test arguments");
	break;
}
