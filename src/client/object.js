const Discord = require('discord.js');
const CommandHandler = require('../command/handler');
const EventHandler = require('../events/handler');
const EventEmit = require('../events/eventhandler');
const peth = require('path');
class Client extends Discord.Client {
	constructor(options = { prefixes:[], ownerID:'', mentionAsPrefix:false }) {
		super(options);

		this.ownerID = options.ownerID;
		this.events = new EventEmit();

		this.prefixes = options.prefixes;
		this._commandhandler = new CommandHandler(this);
		this._eventhandler = new EventHandler(this);
		this._mentionAsPrefix = options.mentionAsPrefix;
	}

	loadCommands(directory) {
		this._commandhandler.init(directory);

		this.on('message', (message)=>{
			if(this._mentionAsPrefix) {
				this.prefixes.push(`<@!?${message.client.user.id}>`);
			}

			const prefixMention = new RegExp(`^(${this.prefixes.join('|')})`);
			const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : null;
			if (!message.content.startsWith(prefix) || message.author.bot) {return;}

			const args = message.content.slice(prefix.length).trim().split(/ +/g);
			const commandName = args.shift().toLowerCase();
			const command = this._commandhandler.commands.get(commandName) || this._commandhandler.commands.find(x=>x.alias && x.alias.includes(commandName));
			if(!command) {return this.events.emit('commandInvalid', message.member, commandName);}

			try{

				command.execute(this, message, args);
			}

			catch(error) {
				this.events.emit('commandError', error);
			}


		});

	}

	loadEvents(directory) {
		this._eventhandler.init(directory);
	}
	reloadFile(path) {
		// ../../../
		const command = require(peth.resolve(`${path}`));
		if(typeof command == 'function') {

			if(new command().name) {
				this._commandhandler.commands.delete(new command().name);
				setTimeout(() => {
					this._commandhandler.commands.set(command.name, command);
				}, 100);
				delete require.cache[require.resolve(peth.resolve(`${path}`))];

				const nCommand = require(peth.resolve(`${path}`));
				setTimeout(() => {
					const x = new nCommand();
					this._commandhandler.commands.set(x.name, x);
				}, 100);

			}
			else{
				delete require.cache[require.resolve(peth.resolve(`${path}`))];
			}

		}
		else{
			delete require.cache[require.resolve(peth.resolve(`${path}`))];
		}
	}
}
module.exports = Client;