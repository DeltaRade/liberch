const sqlite3 = require('sqlite3');
const events = require('events');
class SQLite3 extends events.EventEmitter {
	constructor(filename) {
		super();
		this._filename = filename;
		this.database = new sqlite3.Database(this._filename, (err)=>{
			if(err) {
				this.emit('error', err);
			}
			else{
				process.nextTick(()=>{
					this.emit('connected');
				});
			}
		});

	}

	createTable(tablename, values = []) {
		this.database.run(`CREATE TABLE IF NOT EXISTS ${tablename} (${values.join(',')})`, (thisres, err)=>{
			if(err) {
				process.nextTick(()=>{
					this.emit('error', err);
				});
			}
		});
	}

	insert(tablename, columns = [], values = []) {
		const plc = values.map((val)=>'(?)').join(',');
		this.database.run(`INSERT OR REPLACE INTO ${tablename} (${columns.join(',')}) VALUES ('${values.join('\',\'')}')`, (err)=>{
			if(err) {
				process.nextTick(()=>{
					this.emit('error', err);
				});
			}

		});
	}

	get(tablename, column, value) {
		return new Promise((resolve, reject)=>{
			this.database.get(`SELECT * FROM ${tablename} WHERE ${column}='${value}'`, (err, row)=>{
				if(err) {			// * || column
					this.emit('error', err);
					reject(err);
				}
				else{
					resolve(row);
				}
			});
		});
	}

	close() {
		this.database.close(err=>{
			if(err) {
				this.emit('error', err);
			}
		});
	}

}
/* const x = new SQLite3('test.sqlite');
x.on('error', (error)=>console.log(error));
x.createTable('settings', ['guild', 'welcomemsg']);
const s = 12312;
x.insert('settings', ['guild', 'welcomemsg'], [10, 'oof']);
x.get('settings', 'guild', 10)
	.then((b)=>console.log(b));
x.close();
*/
// test code
module.exports = SQLite3;