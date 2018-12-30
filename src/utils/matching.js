class Utils {
	constructor() {
		throw new Error('CLASS CANNOT BE INSTANTIATED');
	}

	static async findMembersMatch(guild, name) {
		const array = guild.members.array()
			.filter(x=>x.user.username.includes(name))
			.map(x=>x);
		return array;
	}

	static async findChannelsMatch(guild, channelName) {
		const array = guild.channels.array()
			.filter(x=>x.name.includes(channelName))
			.map(x=>x);
		return array;
	}

	static async findEmojisMatch(guild, emojiName) {
		const array = guild.emojis.array()
			.filter(x=>x.name.includes(emojiName))
			.map(x=>x);
		return array;
	}

	static async findRolesMatch(guild, roleName) {
		const array = guild.roles.array()
			.filter(x=>x.name.includes(roleName))
			.map(x=>x);
		return array;
	}
}
module.exports = Utils;