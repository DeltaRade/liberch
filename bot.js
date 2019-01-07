const oversimple = require('./oversimple');

const client = new oversimple.Client({ prefixes:[';'], mentionAsPrefix:true });
const filewatch = new oversimple.FileWatch();
client.loadCommands('commands');
client.loadEvents('events');
client.listenForCommands();
filewatch.watchDir('commands');

filewatch.on('dirChanged', (event, dir, file)=>{
	if(event != 'change') {return;}
	console.log(`reloading file: ${file}`);
	client.reloadFile(`${dir}/${file}`);
});
client.events.on('commandInvalid', (member, command)=>{
	console.log(`${member.user.username} attempted to use invalid command: ${command}`);
});


client.login('NDgwODgyNjQ2MjM5NDEyMjI0.DwWFSg.T9UzMTpi4C38vV-HI7x4gUCKwdk');