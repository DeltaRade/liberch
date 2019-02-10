const { Command, PostgreSQL } = require('liberch');
class WChannel extends Command {
	constructor() {
		super({ name:'welcomechannel', alias:['wchannel'] });
	}

	async execute(client, message) {
		const sql = new PostgreSQL({
			connectionString:process.env.DATABASE_URL,
			ssl:true,
		});
		await sql.connect();
		const channel = message.channel;
		await sql.upsert('settings', ['guild', 'welcomechannel'], [message.guild.id, channel.id]);
		await sql.end();
		message.channel.send('welcome channel selected');
	}
}

module.exports = WChannel;