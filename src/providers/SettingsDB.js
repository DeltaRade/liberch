/**
 * @abstract
 */
class SettingsDB {
	constructor() {
		if (this.constructor.name == 'SettingsProvider') {
			throw new Error('Cannot initialize abstract class ');
		}
	}
	get() {
		throw new Error('get not implemented');
	}
	delete() {
		throw new Error('delete not implemented');
	}
	set() {
		throw new Error('set not implemented');
	}
	clear() {
		throw new Error('clear not implemented');
	}
	getAll() {
		throw new Error('getAll not implemented');
	}
}

module.exports = SettingsDB;
