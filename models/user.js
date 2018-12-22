const MySql = require('mysql');
const DB = require('./database');
module.exports = function User() {
	var id, amount, phonenumber, auth_key, password;

	this.is_user = function() {
		return this.id != 'undefined' && this.amount != 'undefined' && this.phonenumber != 'undefined';
	}


	this.auth = function(user, user_callback) {
		var query = "SELECT * FROM users WHERE phonenumber=? and password=?";
		try {
			var db = new DB;
			var conn = db.getConnection();
			conn.query(query, [this.phonenumber, this.password], (error, results, fields)=>{
				if(error)
					throw error;
				else {
					//console.log(results);
					if(results.length > 0) {
						var auth_key = "abcde12345";
						var conn2 = db.getConnection();
						var query1 = "UPDATE users SET auth_key=? WHERE id=?";
						conn2.query(query1, [auth_key, results[0].id]);
						user.id = results[0].id;
						user.auth_key = auth_key;
						user.amount = results[0].amount;
						user_callback(user);
						conn2.end();
					}
					else {
						console.log("User not found!");
						console.log(results);
						//user_callback(user);
						return false;
					}
				}
			});
			conn.end();
			return true;
		}
		catch(error) {
			return false;
		}

	}
	
	this.create = function() {
		var query = "INSERT IGNORE INTO users SET id=?, phonenumber=?, password=?, amount=?";
		this.id = "1996";
		try {
			var db = new DB;
			var conn = db.getConnection();
			conn.query(query, [this.id, this.phonenumber, this.password, -1], (error, results, fields)=>{
				if(error)
					throw error;
				else {
					//console.log(results);
					if(results.insertId) return true;
				}
			});
			conn.end();
			return true;
		}
		catch(error) {
			return false;
		}
	}

	this.find = function(id, user, user_callback) {
		query = "SELECT * FROM users WHERE id=?";
		try {
			var db = new DB;
			var conn = db.getConnection();
			conn.query(query, [id], (error, results, fields)=>{
				if(error)
					throw error;
				else {
					//console.log(results);
					//var user = new User;
					user.id = results[0].id;
					user.phonenumber = results[0].phonenumber;
					user.password = results[0].password;
					user.amount = results[0].amount;
					user_callback(user);
					//console.log(user);
				}
			});
			conn.end();
			return true;
		}
		catch(error) {
			return false;
		}

	}

	this.update = function() {
		var query = "UPDATE users SET phonenumber=?, password=?";
		try {
			var db = new DB;
			var conn = db.getConnection();
			conn.query(query, [this.phonenumber, this.password], (error, results, fields)=>{
				if(error)
					throw error;
				else {
					//console.log(results);
					//results.affectedRows
					if(results.insertId) return true;
				}
			});
			conn.end();
			return true;
		}
		catch(error) {
			return false;
		}

	}

	this.del = function() {}
}
