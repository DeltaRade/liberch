const Client = require('../client/object');
const { Message } = require('discord.js');
class Command {
	constructor(options = { name:undefined, description:undefined, usage:undefined, alias: [] }) {
		if(options.name === undefined) {
			throw new Error('NAME_NOT_DEFINED');
		}

		this.name = options.name;
		this.alias = options.alias;
		this.description = options.description;
		this.alias = options.alias;
		this.usage = options.usage;
	}

	/**
 *
 * @param {Message} message
 * @param {Array<String>} args
 * @returns {this}
 * @abstract
 */
	execute(message, args) {
		throw new Error('NOT_IMPLEMENTED');
	}
}

module.exports = Command;