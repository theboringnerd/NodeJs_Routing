module.exports = function DB() {
	
	const mysql = require('mysql');
	
	this.getConnection = function(_query) {
		var connection = mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : 'asshole',
			database : 'PayCameroon',
			results : ''
		});

		return connection;
		
	}
}
