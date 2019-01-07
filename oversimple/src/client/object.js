const Discord = require('discord.js');
const CommandHandler = require('../command/handler');
const EventHandler = require('../events/handler');
const EventEmit = require('../events/eventhandler');
class Client extends Discord.Client {
	constructor(options = { prefixes:[], ownerID:'', mentionAsPrefix:false, options:{} }) {
		super(options.options);

		this.ownerID = options.ownerID;
		this.events = new EventEmit();

		this._prefixes = options.prefixes;
		this._commandhandler = new CommandHandler(this);
		this._eventhandler = new EventHandler(this);
		this._mentionAsPrefix = options.mentionAsPrefix;
	}

	loadCommands(directory) {
		this._commandhandler.init(directory);
	}

	listenForCommands() {
		this.on('message', (message)=>{

			if(this._mentionAsPrefix) {
				this._prefixes.push(`<@!?${message.client.user.id}>`);
			}

			const prefixMention = new RegExp(`^(${this._prefixes.join('|')})`);
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
		const command = require(`../../../${path}`);
		if(typeof command == 'function') {

			if(new command().name) {
				this._commandhandler.commands.delete(new command().name);
				setTimeout(() => {
					this._commandhandler.commands.set(command.name, command);
				}, 100);
				delete require.cache[require.resolve(`../../../${path}`)];

				const nCommand = require(`../../../${path}`);
				setTimeout(() => {
					const x = new nCommand();
					this._commandhandler.commands.set(x.name, x);
				}, 100);

			}
			else{
				delete require.cache[require.resolve(`../../../${path}`)];
			}

		}
		else{
			delete require.cache[require.resolve(`../../../${path}`)];
		}
	}
}

module.exports = Client;