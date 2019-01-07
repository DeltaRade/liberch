const frame = require('../oversimple');
class TestCommand extends frame.Command {
	constructor() {
		super({ name:'cookie' });
	}

	execute(client,message, args) {
		message.reply('🍪 here\'s your cookie')
	}
}
module.exports = TestCommand;



/*	const prompt = new frame.TextPrompt(message.client);
		prompt.create(message, 'say whatever ye want', {time:10000 });
		prompt.onCollect = (r)=>{
			message.channel.send(`collected \`${r.content}\``);
		};
		prompt.onEnd = (collection)=>{
			//console.log(collection);
		};
 */