const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const events = require('events');
const Cooldown=require('../cooldowns/cooldown')
class CommandHandler extends events.EventEmitter {
	constructor(client) {
		super()
		this.client = client;
		this.commands = new Discord.Collection();
		this.cooldowns = new Cooldown();
	}
	load(directory) {
		const commandFiles = fs.readdirSync(`${directory}`).filter(file=>file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(path.resolve(`${directory}/${file}`));
			this.commands.set(command.name, command);
		}
		loadDefault(this,'help')
		loadDefault(this,'eval')
	}

	/**
	 *
	 *
	 * @param {Discord.Message} message
	 * @returns
	 * @memberof CommandHandler
	 */
	
	handle(message){
		if(message.system)return;
		if(message.author.bot)return;
		const prefixMention = new RegExp(`^(${this.client.prefixes.join('|')})`);
		const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : null;
		if (!message.content.startsWith(prefix) || message.author.bot) {return;}
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const commandName = args.shift().toLowerCase();
		const command = this.commands.get(commandName) || this.commands.find(x=>x.alias && x.alias.includes(commandName));
		if(!command) {
			return this.emit('commandInvalid', message.member, commandName);
		}
		if(!this.cooldowns.has(command.name)){
			this.cooldowns.set(command.name,new Cooldown())
		}
		let now=Date.now()
		let timestamp=this.cooldowns.get(command.name)
		let cooldownAmmount=(command.cooldown || 1) * 1000
		if(timestamp.has(message.author.id)){
			const expireTime=timestamps.get(message.author.id) + cooldownAmmount
			if(now < expireTime){
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
			}
		}
		timestamp.set(message.author.id, now);
		setTimeout(() => timestamp.delete(message.author.id), cooldownAmount);
		try{
			command.execute(message, args);
		}
		catch(error) {
			this.emit('commandError', error);
		}
	}
}
function loadDefault(handler,def){
	const command = require(`../../defaultcommands/${def}`);
	handler.commands.set(command.name, command);
}
module.exports = CommandHandler;