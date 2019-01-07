const Discord = require('discord.js');

class TextPrompt {
	constructor(client) {
		this.client = client;
		this.collector;
		this.time;
	}
	create(message, msg, options = { time:30, maxprocess:0, maxcollect:0, filter:{ authorOnly:false } }) {
		message.channel.send(msg);
		const option = {};
		option['time'] = options.time;
		option['max'] = options.maxprocess;
		option['maxMatches'] = option.maxcollect;
		const filter = (m)=>!m.author.bot;
		this.collector = message.channel.createMessageCollector(filter, option);
		this.collector.on('collect', (m)=>{this.onCollect(m);});
		this.collector.on('end', (collected)=>{this.onEnd(collected);});
	}
	onCollect(m) {
		throw new Error('onCollect_NOT_IMPLEMENTED');
	}
	onEnd(collected) {
		throw new Error('onEnd_NOT_IMPLEMENTED');
	}
}

class ReactionPrompt {
	constructor(client) {
		this.client = client;
		this.time;
	}
	async create(message, msg, options = { emojisToCollect:[], filterUserID:[], time:30, maxEmojis:undefined, maxUsers:undefined }) {
		const x = await message.channel.send(msg);
		for(const i of options.emojisToCollect) {
			const em = message.guild.emojis.get(i) || i;
			x.react(em);
		}
		const option = {};
		option['time'] = options.time;
		option['maxEmojis'] = options.maxEmojis;
		option['maxUsers'] = options.maxUsers;
		const filter = (reaction, user)=>(options.emojisToCollect.includes(reaction.emoji.name) || options.emojisToCollect.includes(reaction.emoji.id)) && !user.bot;
		const cll = x.createReactionCollector(filter, option);
		cll.on('collect', (r)=>{
			this.onCollect(r);
		});
		cll.on('end', (collected)=>{
			this.onEnd(collected);
		});
	}
	onCollect(r) {
		throw new Error('onCollect_NOT_IMPLEMENTED');
	}
	onEnd(collected) {
		throw new Error('onEnd_NOT_IMPLEMENTED');
	}
}
exports.TextPrompt = TextPrompt;
exports.ReactionPrompt = ReactionPrompt;