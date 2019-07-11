const { Message } = require('discord.js');

class Command {
	constructor(
		{
			name,
			description,
			usage,
			alias = [],
			cooldown = 1,
			requireUserPermissions = [],
			requirePermissions = [],
		} = {
			name: undefined,
			description: undefined,
			usage: undefined,
			alias: [],

			cooldown: 1,
		}
	) {
		if (name === undefined) {
			throw new Error('NAME_NOT_DEFINED');
		}

		this.help = {
			name,
			description,
			alias,
			usage,
			cooldown,
			requirePermissions,
			requireUserPermissions,
		};
		return this
	}

	/**
	 *@param {(client:import('../client/client'),message:Message,args:[])=>void} fn
	 * @returns {this}
	 */
	run(fn) {
		this.execute = fn;
		return this
	}
}

module.exports = Command;
