const { Message } = require('discord.js');

class Command {
	constructor(
		options = {
			name: undefined,
			description: undefined,
			usage: undefined,
			alias: [],
			cooldown: 1,
		}
	) {
		if (options.name === undefined) {
			throw new Error('NAME_NOT_DEFINED');
		}

		this.name = options.name;
		this.alias = options.alias;
		this.description = options.description;
		this.alias = options.alias;
		this.usage = options.usage;
		this.cooldown = options.cooldown;
	}

	/**
	 *@param {(message:Message,args:[])=>void} fn
	 * @returns {this}
	 */
	setExecute(fn) {
		this.execute = fn;
	}
}

module.exports = Command;
