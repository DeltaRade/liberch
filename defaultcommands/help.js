const Command = require('../src/command/command');
class HelpCommand extends Command {
	constructor() {
		super({ name:'help', description:'list all commands or info about a specific command', usage:'[command name]' });
	}

	execute(client, message, args) {
		const data = [];
		const { commands } = client;
		if(!args.length) {
			data.push('```Here\'s a list of all my commands```');
			data.push(commands.map(x=>x.name).join(', '));
			data.push(`\nYou can use \`${client.prefixes.join(' or ').replace('\\\\', '').replace('\\\\', '').replace(`<@!?${client.id}>`, `@${client.ussername}`)}help [command name]\` to get info on a specific command!`);


			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
				});
		}
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${client.prefixes.join(' or ').replace('\\\\', '')}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 0} second(s)`);

		message.channel.send(data, { split: true });


	}
}

module.exports = HelpCommand;