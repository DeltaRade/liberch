const Discord = require('discord.js');
const CommandHandler = require('../command/handler');
class Client extends Discord.Client {
	constructor(options = { prefix:'', mentionAsPrefix:false, options:{} }) {
		super(options.options);
		this.prefix = options.prefix;
		this.handler = new CommandHandler(this);
		this.mentionAsPrefix = options.mentionAsPrefix;
	}
	init(token) {
		this.login(token);
	}
	loadCommands(directory) {
		this.handler.init(directory);
	}

	listenForCommands() {
		this.on('message', (message)=>{
			const prefixMention = new RegExp(`^<@!?${this.user.id}> `);
			const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : this.prefix;

			if (!message.content.startsWith(prefix) || message.author.bot) {return;}

			const args = message.content.slice(prefix.length).trim().split(/ +/g);
			const commandName = args.shift().toLowerCase();
			const command = this.handler.commands.get(commandName) || this.handler.commands.find(x=>x.alias && x.alias.includes(commandName));
			if(!command) {return;}
			try{
				command.execute(message, args);

			}
			catch(error) {
				console.log(error);
			}


		});

	}

}

module.exports = Client;