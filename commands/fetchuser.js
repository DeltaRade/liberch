const frame = require('../oversimple');
const Discord = require('discord.js');
class RoleReaction extends frame.Command {
	constructor() {
		super({ name:'finduser' });
	}
	/**
     *
     * @param {frame.Client} client
     * @param {Discord.Message} message
     * @param {Array} args
     */
	async execute(client, message, args) {
		const users = await frame.Utils.findMembersMatch(message.guild, args[0]);
		const embed = new Discord.RichEmbed();
		let st = '';
		for(const i of users) {
			st += i.user.username + ' ' + i.id + '\n';
		}

		embed.setDescription(st);
		message.channel.send(embed);
	}

}

module.exports = RoleReaction;