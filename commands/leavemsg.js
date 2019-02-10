const liberch = require('liberch');
class Leavemsg extends liberch.Command {
	constructor() {
		super({ name:'leavemsg', alias:['lmsg'] });
	}

	async execute(client, message, args) {
		const sqlite = new liberch.PostgreSQL({
			connectionString:process.env.DATABASE_URL,
			ssl:true,
		});
		await sqlite.connect();
		if(!args[0]) {
			message.channel.send('disabled leave message');
			await sqlite.upsert('settings', ['guild', 'leavemsg'], [message.guild.id, '']);
			// await sqlite.update('settings', 'leavemsg', '', 'guild', message.guild.id);
			await sqlite.end();
			return;
		}
		const msg = args.join(' ');
		const guildID = message.guild.id;
		await sqlite.upsert('settings', ['guild', 'leavemsg'], [guildID, msg]);
		await sqlite.end();
		message.channel.send(`leave message selected\npreview:\n\`\`\`${msg}\`\`\``);
	}
}

module.exports = Leavemsg;