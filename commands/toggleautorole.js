const liberch = require('liberch');
class EnableATR extends liberch.Command {
	constructor() {
		super({ name:'toggleautorole', alias:['tarole'] });
	}

	async execute(client, message, args) {
		const sql = new liberch.PostgreSQL({
			connectionString:process.env.DATABASE_URL,
			ssl:true,
		});
		await sql.connect();
		const isenabled = await sql.get('settings', 'guild', message.guild.id);
		if(!isenabled || !isenabled.autoroleenabled || isenabled.autoroleenabled === 'false') {
			await sql.upsert('settings', ['guild', 'autoroleenabled'], [message.guild.id, true]);
			message.channel.send('autorole enabled');
		}
		else{
			await sql.upsert('settings', ['guild', 'autoroleenabled'], [message.guild.id, false]);
			message.channel.send('autorole disabled');
		}

		await sql.end();
	}
}

module.exports = EnableATR;