const Discord = require('discord.js');
const CommandHandler = require('../command/handler');
const EventHandler = require('../events/handler');
const path = require('path');
const fs=require('fs')
class Client extends Discord.Client {
	constructor(
		options = { prefix, ownerID: '', commandsDir: 'commands' }
	) {
		super(options);
		if (!options.commandsDir) options.commandsDir = 'commands';
		this.ownerID = options.ownerID;
		this._helpcommand = '../../defaultcommands/help';
		this.prefix = options.prefix;
		this.commandHandler = new CommandHandler(this, options.commandsDir);
		this.commandHandler.load()
		this.eventHandler = new EventHandler(this);
		this.commandsDir = options.commandsDir;
		this.settings = null;
	}
	/**
	 *
	 * @param {string} directory
	 */
	loadEvents(directory) {
		this.eventHandler.load(directory);
	}

	reloadCommands() {
		let folder = path.resolve(this.commandsDir);
		const commandFiles = fs
			.readdirSync(folder)
			.filter((file) => file.endsWith('.js'));

		for (const file of commandFiles) {
			delete require.cache[require.resolve(`${folder}/${file}`)];
			try {
				const command = require(`${folder}/${file}`);
				this.commandHandler.commands.delete(command.name);
				this.commandHandler.commands.set(command.name, command);
			} catch (err) {
				console.log(err);
			}
		}
	}
	setSettings(settingsDB) {
		this.settings = settingsDB;
	}
}
module.exports = Client;
