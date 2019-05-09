const jndb = require('jndb');
class Database extends jndb.Connection {
	constructor(table) {
		super(table);
	}
}
module.exports = Database;
