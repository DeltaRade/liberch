const liberch = require('liberch');
class SetAutoRoleRole extends liberch.Command {
	constructor() {
		super({ name:'setautorolerole', alias:['setarole'] });
	}
	async execute(client, message, args) {
		const role = message.guild.roles.find(x=>x.name.toLowerCase() == args[0].toLowerCase()) || message.guild.roles.get(args[0]);
		if(!role) {
			return message.channel.send('invalid role name or role id');
		}
		const sql = new liberch.PostgreSQL({
			connectionString:process.env.DATABASE_URL,
			ssl:true,
		});
		await sql.connect();
		await sql.upsert('settings', ['guild', 'autorolerole'], [message.guild.id, role.id]);
		await sql.end();
		message.channel.send(`set autorole role to: \`\`${role.name}\`\``);
	}
}
module.exports = SetAutoRoleRole;