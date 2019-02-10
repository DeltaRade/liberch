const { Command, PostgreSQL } = require('liberch');
class LChannel extends Command {
	constructor() {
		super({ name:'leavechannel', alias:['lchannel'] });
	}

	async execute(client, message) {
		const sql = new PostgreSQL({
			connectionString:process.env.DATABASE_URL,
			ssl:true,
		});
		await sql.connect();
		const channel = message.channel;
		await sql.upsert('settings', ['guild', 'leavechannel'], [message.guild.id, channel.id]);
		await sql.end();
		message.channel.send('leave channel selected');
	}
}

module.exports = LChannel;