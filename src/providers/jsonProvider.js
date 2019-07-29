const jndb = require('jndb');
const base=require('./SettingsDB')
class JSONSettingsDB extends base {
	constructor() {
		super()
		this.conn = new jndb.Connection();
		this.conn.use('settings');
		return this;
	}
	get(guild, key, defaultVal) {
		let data = this.conn.secure(guild.id, {});
		return data[key] ? data[key] : defaultVal;
	}
	delete(guild, key) {
		let data = this.conn.secure(guild.id, {});
		delete data[key];
		this.conn.insert(guild.id, data);
		return this
	}
	set(guild, key, value) {
		let data = this.conn.secure(guild.id, {});
		data[key] = value;
		this.conn.insert(guild.id, data);
		return this
	}
	clear(guild) {
		this.conn.insert(guild.id, {});
		return this
	}
	getAll(guild) {
		return this.conn.secure(guild.id, {});
	}
}
module.exports = JSONSettingsDB;
