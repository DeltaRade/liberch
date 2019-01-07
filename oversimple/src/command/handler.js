const Discord = require('discord.js');
const fs = require('fs');
class CommandHandler {
	constructor(client) {
		this.client = client;
		this.commands = new Discord.Collection();
		this.cooldowns = new Set();
	}
	init(directory) {
		const commandFiles = fs.readdirSync(`${directory}`).filter(file=>file.endsWith('.js'));
		for (const file of commandFiles) {
			// const f = require('../../../commands/test');
			// console.log(f);
			const command = require(`../../../${directory}/${file}`);
			const obj = new command();
			// console.log(obj);
			this.commands.set(obj.name, obj);
		}
	}
}

module.exports = CommandHandler;