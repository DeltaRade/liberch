const jndb = require('jndb');
const base=require('./SettingsDB')
class JSONSettingsDB extends base {
	constructor() {
		super()
		this.conn = new jndb.Connection();
		this.conn.use('settings');
		return this;
	}
	get(guildID, key, defaultVal) {
		let data = this.conn.secure(guildID, {});
		return data[key] ? data[key] : defaultVal;
	}
	delete(guildID, key) {
		let data = this.conn.secure(guildID, {});
		delete data[key];
		this.conn.insert(guildID, data);
		return this
	}
	set(guildID, key, value) {
		let data = this.conn.secure(guildID, {});
		data[key] = value;
		this.conn.insert(guildID, data);
		return this
	}
	clear(guildID) {
		this.conn.insert(guildID, {});
		return this
	}
	getAll(guildID) {
		return this.conn.secure(guildID, {});
	}
}
module.exports = JSONSettingsDB;
