const Discord = require('discord.js');
const CommandHandler = require('../command/handler');
class Client extends Discord.Client {
	constructor(options = { prefix:'', mentionAsPrefix:false, options:{} }) {
		super(options.options);
		this._prefix = options.prefix;
		this._handler = new CommandHandler(this);
		this._mentionAsPrefix = options.mentionAsPrefix;
	}
	init(token) {
		this.login(token);
	}
	loadCommands(directory) {
		this._handler.init(directory);
	}

	listenForCommands() {
		this.on('message', (message)=>{
			const prefixMention = new RegExp(`^<@!?${this.user.id}> `);
			let prefix;
			if(this.mentionAsPrefix) {
				prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : this._prefix;
			}
			else{
				prefix = this._prefix;
			}
			if (!message.content.startsWith(prefix) || message.author.bot) {return;}

			const args = message.content.slice(prefix.length).trim().split(/ +/g);
			const commandName = args.shift().toLowerCase();
			const command = this._handler.commands.get(commandName) || this._handler.commands.find(x=>x.alias && x.alias.includes(commandName));
			if(!command) {return;}
			try{
				command.execute(message, args);

			}
			catch(error) {
				console.log(error);
			}


		});

	}

	reloadFile(path) {
		const command = require(`../../../${path}`);
		if(typeof command == 'function') {

			console.log(typeof command);
			if(new command().name) {
				this._handler.commands.delete(new command().name);
				setTimeout(() => {
					this._handler.commands.set(command.name, command);
				}, 100);
				delete require.cache[require.resolve(`../../../${path}`)];

				const nCommand = require(`../../../${path}`);
				setTimeout(() => {
					const x = new nCommand();
					this._handler.commands.set(x.name, x);
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