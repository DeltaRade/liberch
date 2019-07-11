const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const events = require('events');
const Cooldown = require('../cooldowns/cooldown');
/**
 * @extends {events.EventEmitter}
 */
class CommandHandler extends events.EventEmitter {
	constructor(client, directory) {
		super();
		this.client = client;
		this.commands = new Discord.Collection();
		this.cooldowns = new Cooldown();
		this.directory = directory;
		this.categories = new Discord.Collection();
	}
	load() {
		let folder = path.resolve(this.directory);
		const commandFiles = fs
			.readdirSync(`${this.directory}`);
		const jsfile = commandFiles.filter(
			(f) =>
				f.split('.').pop() === 'js' &&
				!fs.statSync(`${folder}/` + f).isDirectory()
		); // get all .js files

		const categories = commandFiles.filter((f) =>
			fs.statSync(folder + '/' + f).isDirectory()
		);

		if (jsfile.length <= 0 && categorys.length <= 0) {
			// if no commands present

			console.log(" Couldn't find commands."); // log no commands => close commandhandler and start client
		}
		for (let file of jsfile) {
			file = path.resolve(this.directory+'/'+file);
			try{
				const command = require(file);
				this.commands.set(command.help.name, command);
			}
			catch(e){
				console.error(e)
			}
		}
		for (let cat of categories) {
			cat=path.resolve(this.directory+'/'+cat)
			const catFiles = fs
				.readdirSync(`${cat}`)
				.filter((file) => file.endsWith('.js'));
			this.categories.set(cat, catFiles.length);
			for (let file of catFiles) {
				file = path.resolve(cat+'/'+file);
				try{
					const command = require(file);
					command.category=cat
					this.commands.set(command.help.name, command);
				}
				catch(e){
					console.log(e)
				}
			}
		}
		loadDefault(this, 'help');
		loadDefault(this, 'eval');
	}

	/**
	 *
	 *
	 * @param {Discord.Message} message
	 * @returns
	 * @memberof CommandHandler
	 * @fires commandError
	 * @fires commandInvalid
	 */

	handle(client,message) {
		if (message.system) return;
		if (message.author.bot) return;
		const prefixRegex = new RegExp(`^(<@!?${this.client.user.id}>|${this.client.prefix.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})\\s*`);
		const prefix = message.content.match(prefixRegex)
			? message.content.match(prefixRegex)[0]
			: null;
		if (!message.content.startsWith(prefix) || message.author.bot) {
			return;
		}
		const args = message.content
			.slice(prefix.length)
			.trim()
			.split(/ +/g);
		const commandName = args.shift().toLowerCase();
		const command =
			this.commands.get(commandName) ||
			this.commands.find((x) => x.help.alias && x.help.alias.includes(commandName));
		if (!command) {
			return this.emit('commandInvalid', message.member, commandName);
		}
		if (!this.cooldowns.has(command.name)) {
			this.cooldowns.set(command.name, new Cooldown());
		}
		let now = Date.now();
		let timestamp = this.cooldowns.get(command.name);
		let cooldownAmount = (command.cooldown || 1) * 1000;
		if (timestamp.has(message.author.id)) {
			const expireTime =
				timestamp.get(message.author.id) + cooldownAmount;
			if (now < expireTime) {
				const timeLeft = (expireTime - now) / 1000;
				return message.reply(
					`please wait ${timeLeft.toFixed(
						1
					)} more second(s) before reusing the \`${
						command.name
					}\` command.`
				);
			}
		}
		timestamp.set(message.author.id, now);
		setTimeout(() => timestamp.delete(message.author.id), cooldownAmount);
		try {
			command.execute(client,message, args);
		} catch (error) {
			/**
			 * @event commandError
			 * @param {Error} error
			 */
			this.emit('commandError', error);
		}
	}
	reloadAll() {
		let folder = path.resolve(this.directory);
		const commandFiles = fs
			.readdirSync(folder)
			.filter((file) => file.endsWith('.js'));

		for (const file of commandFiles) {
			delete require.cache[require.resolve(`${folder}/${file}`)];
			try {
				const command = require(`${folder}/${file}`);
				this.commands.delete(command.help.name);
				this.commands.set(command.help.name, command);
			} catch (err) {
				console.log(err);
			}
		}
	}
}
function loadDefault(handler, def) {
	const command = require(`../../defaultcommands/${def}`);
	handler.commands.set(command.help.name, command);
}
module.exports = CommandHandler;

/**
 * Emitted for errors in a command
 * @event commandError
 * @param {Error} error error that occurred
 */
