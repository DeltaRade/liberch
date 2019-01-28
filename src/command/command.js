const Client = require('../client/object');
const { Message } = require('discord.js');
class Command {
	constructor(options = { name:undefined, description:'', usage:'', alias: [] }) {
		if(options.name === undefined) {
			throw new Error('NAME_NOT_DEFINED');
		}

		this.name = options.name;
		this.alias = options.alias;
		this.description = options.description;
		this.alias = options.alias;
	}

	/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {Array} args
 */
	execute(client, message, args) {
		throw new Error('NOT_IMPLEMENTED');
	}
}

module.exports = Command;