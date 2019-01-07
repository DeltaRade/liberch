const frame=require('../oversimple')
class MuteCommand extends frame.Command{
    constructor(){
        super({name:'mute'})
    }
    async execute(client,message,args){
        if(!message.member.permissions.has('KICK_MEMBERS')){return }
        const person = message.mentions.members.first();
		args.shift();
		const time = args.shift();
		if(!person) {return message.channel.send('no one was found...*boi*');}
		if(!time) {return message.channel.send('where do u live bro?');}
		let role = await message.guild.roles.find(x=>x.name === 'muted');
		if(!role) {
			message.channel.send('no muted role found... creating one');
			role = await message.guild.createRole({ name:'muted' });

			message.guild.channels.forEach(ch=>{
				ch.overwritePermissions(role.id, { 'SEND_MESSAGES':false });// VIEW_CHANNEL or SEND_MESSAGES
			});

		}
		// setTimeout(()=>{
		await person.addRole(role);
		message.channel.send(`${person.user.tag} has been muted for ${ms(ms(time), { long:true })}`);
		setTimeout(async () => {
			await person.removeRole(role);
			message.channel.send(`unmuted ${person.user.tag}`);
		}, ms(time));
		// },1000)
    }
}

module.exports=MuteCommand