const Discord = require('discord.js');
const CommandHandler = require('../command/handler');
const EventHandler = require('../events/handler');
const peth = require('path');
class Client extends Discord.Client {
	constructor(options = { prefixes:[], ownerID:'', mentionAsPrefix:false }) {
		super(options);

		this.ownerID = options.ownerID;
		this._helpcommand = '../../defaultcommands/help';
		this.prefixes = options.prefixes.map(v=>`\\${v}`);
		this.commandHandler = new CommandHandler(this);
		this._eventhandler = new EventHandler(this);
		this._mentionAsPrefix = options.mentionAsPrefix;
		options.mentionAsPrefix?this.prefixes.push(`<@!?${this.user.id}>`):''
	}

	loadEvents(directory) {
		this._eventhandler.init(directory);
	}

	reloadCommand(path) {
		const command = require(peth.resolve(`${path}`));
		// console.log(command.prototype.execute);
		if(typeof command.prototype.execute === 'function') {
			this._commandhandler.commands.delete(new command().name);
			delete require.cache[require.resolve(peth.resolve(`${path}`))];

			const nCommand = require(peth.resolve(`${path}`));

			const x = new nCommand();
			this._commandhandler.commands.set(x.name, x);

		}
	}

	disableDefaultHelpCommand() {
		this._helpcommand = undefined;
	}

}
module.exports = Client;