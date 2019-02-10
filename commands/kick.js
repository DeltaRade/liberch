const { Command } = require('liberch');
const { Message } = require('discord.js');
class KickCommand extends Command {
	constructor() {
		super({ name:'kick' });
	}
	/**
	 *
	 * @param {liberch.Client} client
	 * @param {Message} message
	 * @param {Array} args
	 */
	execute(client, message) {
		const user = message.mentions.members.first();
		if(!user) {
			return message.channel.send('invalid user');
		}

		user.kick(`requested by ${message.author.username}`);
	}

}

module.exports = KickCommand;