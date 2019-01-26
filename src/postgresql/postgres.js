const pg = require('pg');
class PostgreSQL {
	constructor(options = { user:undefined, password:undefined, database:undefined, port:undefined, connectionString:'', ssl:undefined, types:undefined, statement_timeout:undefined }) {
		this.client = new pg.Client(options);
	}
	async connect() {
		return this.client.connect();
	}

	async end() {
		return this.client.end();
	}

	async query(query) {
		return this.client.query(query);
	}

}

module.exports = PostgreSQL;