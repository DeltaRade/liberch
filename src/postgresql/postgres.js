const pg = require('pg');
class PostgreSQL {
	constructor(options = { user:undefined, password:undefined, database:undefined, port:undefined, connectionString:'', ssl:undefined, types:undefined, statement_timeout:undefined }) {
		this.client = new pg.Client(options);
	}
	async connect() {
		return this.client.connect();
	}

	async createTable(table, columns) {
		return this.client.query(`CREATE TABLE IF NOT EXISTS ${table}(${columns.join(',')})`);
	}
	async end() {
		return this.client.end();
	}

	async get(table, column, value) {
		return this.client.query(`GET * FROM ${table} WHERE ${column}=${value}`);
	}

	async insertOrUpdate(table, columns, values) {
		return this.client.query(`UPDATE OR INSERT INTO ${table}(${columns.join(',')}) VALUES('${values.join('\',\'')})'`);
	}

	async query(query) {
		return this.client.query(query);
	}
}

module.exports = PostgreSQL;