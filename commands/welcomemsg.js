const liberch = require('liberch');
class Welcomemsg extends liberch.Command {
	constructor() {
		super({ name:'welcomemsg', alias:['wmsg'] });
	}

	async execute(client, message, args) {
		const sql = new liberch.PostgreSQL({
			connectionString:process.env.DATABASE_URL,
			ssl:true,
		});
		await sql.connect();
		if(!args[0]) {
			message.channel.send('disabled welcome message');
			await sql.upsert('settings', ['guild', 'welcomemsg'], [message.guild.id, '']);
			await sql.end();
			return;
		}
		const msg = args.join(' ');
		const guildID = message.guild.id;
		await sql.upsert('settings', ['guild', 'welcomemsg'], [guildID, msg]);
		await sql.end();
		message.channel.send(`welcome message selected\npreview:\n\`\`\`${msg}\`\`\``);
	}
}

module.exports = Welcomemsg;