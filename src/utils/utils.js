const { ms } = require('ms');
const { Permissions } = require('discord.js');
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
		return Object.keys(Permissions.FLAGS);
	}

	static permissionNumberToFlag(num) {
		const arr = [];
		for (const key of Object.keys(Permissions.FLAGS)) {
			if (num & Permissions.FLAGS[key]) {
				arr.push(key);
			}
		}

		return arr;
	}
	static msToTime(time) {
		return ms(time, { long:true });
	}

	static containsInvite(string) {
		return /(https?(:\/\/)?)?(www\.)?(discord\.(gg|io|me)|discordapp\.com\/invite)\/.+[a-z]/.test(string);
		// /^(https?:\/\/)?(www\.)?(discord\.(gg|io|me)|discordapp\.com\/invite)\/.+[a-z]/.test(string);
	}
}
module.exports = Utils;