const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
class CommandHandler {
	constructor(client) {
		this.client = client;
		this.commands = new Discord.Collection();
		this.cooldowns = new Set();
	}
	init(directory) {
		const commandFiles = fs.readdirSync(`${directory}`).filter(file=>file.endsWith('.js'));
		if(this.client._helpcommand) {
			const help = new require(this.client._helpcommand);
			this.commands.set(help.name, help);
		}
		for (const file of commandFiles) {
			// const f = require('../../../commands/test');
			// console.log(f);
			const command = require(path.resolve(`${directory}/${file}`));
			const obj = new command();
			// console.log(obj);
			this.commands.set(obj.name, obj);
		}
	}
}

module.exports = CommandHandler;