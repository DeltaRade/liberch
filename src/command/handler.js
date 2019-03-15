const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const events = require('events');
class CommandHandler extends events.EventEmitter {
	constructor(client) {
		super()
		this.client = client;
		this.commands = new Discord.Collection();
		this.cooldowns = new Set();
	}
	load(directory) {
		const commandFiles = fs.readdirSync(`${directory}`).filter(file=>file.endsWith('.js'));
		if(this.client._helpcommand) {
			const help = require(this.client._helpcommand);
			const cmd = new help();
			this.commands.set(cmd.name, cmd);
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

	/**
	 *
	 *
	 * @param {Discord.Message} message
	 * @returns
	 * @memberof CommandHandler
	 */
	
	exec(message){
		if(message.system)return;
		if(message.author.bot)return;
		const prefixMention = new RegExp(`^(${this.prefixes.join('|')})`);
			const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : null;
			if (!message.content.startsWith(prefix) || message.author.bot) {return;}
			const args = message.content.slice(prefix.length).trim().split(/ +/g);
			const commandName = args.shift().toLowerCase();
			const command = this._commandhandler.commands.get(commandName) || this._commandhandler.commands.find(x=>x.alias && x.alias.includes(commandName));
			if(!command) {
				return this.emit('commandInvalid', message.member, commandName);
			}
			try{
				command.execute(this, message, args);
			}
			catch(error) {
				this.emit('commandError', error);
			}
	}
}

module.exports = CommandHandler;