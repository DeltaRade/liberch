const sqlite3 = require('sqlite3');
const events = require('events');
class SQLite3 extends events.EventEmitter {
	constructor(client, filename) {
		super();
		this._client = client;
		this._filename = filename;
		this.database = new sqlite3.Database(this._filename, (err)=>{
			if(err) {
				this.emit('error', err);
			}
			else{
				this.emit('connected');
			}
		});
	}

	async createTable(tablename, values = []) {
		this.database.run(`CREATE TABLE IF NOT EXISTS ${tablename} (${values.join(',')})`, (thisres, err)=>{
			if(err) {
				this.emit('error', err);
			}
		});
	}

	async insert(tablename, columns = [], values = []) {
		this.database.run(`INSERT OR REPLACE INTO ${tablename} (${columns.join(',')}) VALUES ('${values.join('\',\'')}')`, (err)=>{
			if(err) {
				this.emit('error', err);
			}

		});
	}

	async get(tablename, column, value, callback) {
		this.database.get(`SELECT * FROM ${tablename} WHERE ${column}='${value}'`, (err, row)=>{
			if(err) {			// * || column
				this.emit('error', err);
			}
			else{
				callback(row);
			}
		});
	}

}

module.exports = SQLite3;