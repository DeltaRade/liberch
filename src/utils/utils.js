const ms = require('ms');
const Discord = require('discord.js');
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

	static permissionsFlags() {
		return Object.keys(Discord.Permissions.FLAGS);
	}

	static permissionNumberToFlag(num) {
		const arr = [];
		for (const key of Object.keys(Discord.Permissions.FLAGS)) {
			if (num & Discord.Permissions.FLAGS[key]) {
				arr.push(key);
			}
		}

		return arr;
	}
	static msToTime(time) {
		return ms(time, { long:true });
	}
}
module.exports = Utils;