const DB = require('./database.js');
const Tools = require('./tools.js');
var tools = new Tools;

module.exports = function Transaction() {
	var id, type, service, stat, details, user_id, date;

	this.is_transaction = function() {
		return this.id != 'undefined' && this.user_id != 'undefined' && this.type != 'undefined' && this.service != 'undefined' && this.details != 'undefined'; 
	}

	this.create = function() {
		this.id = tools.generate_random_uuid();
		var query = "INSERT IGNORE INTO transactions SET id=?, user_id=?, type=?, service=?, details=?";
		try {
			var db = new DB;
			var conn = db.getConnection();
			conn.query(query, [this.id, this.user_id, this.type, this.service,JSON.stringify(this.details)], (error, results, fields)=>{
				if(error) {
					//console.log("t_error: " + error);
					throw error;
				}
				else {
					if(results.insertId) return true;
				}
			});
			conn.end();
			return true;
		}
		catch(error) {
			throw error;
		}
	}

	this.find = function(id, transaction, transaction_callback) {
		var query = "SELECT * FROM transactions WHERE id=?";
		try {
			var db = new DB;
			var conn = db.getConnection();
			conn.query(query, [id], (error, results, fields)=>{
				if(error) {
					//console.log("t_error: " + error);
					throw error;
				}
				else {
					transaction.id = results[0].id;
					transaction.user_id = results[0].user_id;
					transaction.type = results[0].type;
					transaction.stat = results[0].status;
					transaction.details = JSON.parse(results[0].details);
					transaction.date = results[0].date;
					transaction.service = results[0].service;
					transaction_callback(transaction);
				}
			});
			conn.end();
			return true;
		}
		catch(error) {
			throw error;
		}

	}


	this.find_user = function(user_id, transaction, transaction_callback) {
		var query = "SELECT * FROM transactions WHERE user_id=?";
		try{
			var db = new DB;
			var conn = db.getConnection();
			conn.query(query, [user_id], (error, results, fields)=>{
				if(error)
					throw error;
				else {
					//console.log(results);
					transaction.id = results[0].id;
					transaction.user_id = results[0].user_id;
					transaction.type = results[0].type;
					transaction.stat = results[0].status;
					transaction.details = JSON.parse(results[0].details);
					transaction.date = results[0].date;
					transaction.service = results[0].service;
					transaction_callback(transaction);
					//console.log(transaction);
				}
			});
			conn.end();
			return true;
		}
		catch(error) {
			throw error;
		}
	}

	this.update = function() {
		var query = "UPDATE transactions SET status=? WHERE id=?";
		try {
			var db = new DB;
			var conn = db.getConnection();
			conn.query(query, [this.stat, this.id], (error, results, fields)=>{
				if(error) {
					//console.log("t_error: " + error);
					throw error;
				}
				else {
					//results.affectedRows
					//console.log(results);
				}
			});
			conn.end();
			return true;
		}
		catch(error) {
			throw error;
		}

	}


	this.charge = function(amount) {
		var ceo = parseInt(amount)/5000;
		//console.log("CEO: " + String(ceo));
		var target = Math.ceil(ceo) * 5000;
		//console.log("Target: " + String(target));
		var charge = 0.03 * target;
		//console.log("charge = " + String(charge));
		return charge;
	}


	this.cash_in = function(transaction_callback) {
		//TODO
	}

	this.del = function() {}
}
