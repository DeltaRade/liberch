
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
 *@param {(message:Message,args:[])=>void} fn
 * @returns {this}
 */
	setExecute(fn) {
		this.execute=fn
	}
}

module.exports = Command;