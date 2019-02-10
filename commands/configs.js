const liberch = require('liberch');
const { RichEmbed } = require('discord.js');
class Status extends liberch.Command {
	constructor() {
		super({ name:'configs' });
	}

	async execute(client, message) {
		const guild = message.guild;
		const sql = new liberch.PostgreSQL({
			connectionString:process.env.DATABASE_URL,
			ssl:true,
		});
		await sql.connect();
		await sql.query(`UPDATE OR INSERT INTO settings(guild) VALUES(${message.guild.id})`);
		const settings = await sql.get('settings', 'guild', message.guild.id);
		const ed = new RichEmbed()
			.setColor('FFB766')
			.setTitle('customizable settings')
			.addField('welcome channel', settings.welcomechannel ? `<#${settings.welcomechannel}>` : 'Not Set', false)
			.addField('welcome message', `\`\`\`${settings.welcomemsg}\`\`\``, false)
			.addField('leave channel', settings.leavechannel ? `<#${settings.leavechannel}>` : 'Not Set', false)
			.addField('leave message', `\`\`\`${settings.leavemsg}\`\`\``)
			.addField('autorole status', settings.autoroleenabled || 'disabled', false)
			.addField('autorole role', settings.autorolerole ? guild.roles.get(settings.autorolerole).name : 'Not Set', false);
		message.channel.send(ed);
		await sql.end();
	}
}

module.exports = Status;