const pg = require('pg');
class PostgreSQL {
	constructor(options = { user:undefined, password:undefined, database:undefined, port:undefined, connectionString:'', ssl:undefined, types:undefined, statement_timeout:undefined }) {
		this.client = new pg.Client(options);
	}
	async connect() {
		return this.client.connect();
	}

	async createTable(table, columns, unique) {
		const mp = columns.map(x=>{
			if(x == unique) {
				return x + ' text UNIQUE';
			}
			return x + ' text';
		});
		const query = `CREATE TABLE IF NOT EXISTS ${table}(${mp.join(',')})`;
		return this.client.query(query);
	}
	async end() {
		return this.client.end();
	}

	async get(table, column, value) {
		const query = `SELECT * FROM ${table} WHERE ${column}=${value}`;
		return this.client.query(query);
	}

	async upsert(table, columns, values, constraint, columnToUpdate, valueToUpdate) {
		const query = `INSERT INTO ${table}(${columns.join(',')}) VALUES('${values.join('\',\'')}') ON CONFLICT(${constraint}) DO UPDATE SET ${columnToUpdate} = ${valueToUpdate}`;
		return this.client.query(query);
	}

	async insertOrIgnore(table, columns, values) {
		const query = `INSERT INTO ${table}(${columns.join(',')}) VALUES('${values.join('\',\'')}') ON CONFLICT DO NOTHING`;
		return this.client.query(query);
	}

	async query(query) {
		return this.client.query(query);
	}
}
const x = new PostgreSQL();
x.createTable('settings', ['oof', 'demed'], 'oof');

module.exports = PostgreSQL;
