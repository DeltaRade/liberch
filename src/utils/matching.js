const Discord = require('discord.js');
class Utils {
	constructor() {
		throw new Error('THIS CLASS CANNOT BE INSTANTIATED');
	}

	static async findMembersMatch(message, name) {
		const array = message.guild.members.array()
			.filter(x=>x.user.username.includes(name))
			.map(x=>x);
		return array;
	}

}
module.exports = Utils;