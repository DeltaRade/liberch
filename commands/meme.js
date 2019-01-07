const frame = require('../oversimple');
const Discord = require('discord.js');
const request = require('request');
class MemeCommand extends frame.Command {
	constructor() {
		super({ name:'meme', alias:[], cooldown:2000 });
		this.cooldown = new frame.Cooldown();
	}
	/**
     *
     * @param {frame.Client} client
     * @param {Discord.Message} message
     * @param {Array} args
     */
	execute(client, message, args) {
		if(this.cooldown.isOnCooldown(message.author.id)) {
			return message.channel.send('command on cooldown');
		}

		this.cooldown.add(message.author.id);
		setTimeout(() => {
			this.cooldown.remove(message.author.id);
		}, 2000);

		const embed = new Discord.RichEmbed();
		request.get('https://api-to.get-a.life/meme', function(error, response, body) {
			const res = JSON.parse(response.body);
			embed.setImage(res.url);
			embed.setTitle(res.text);

			message.channel.send(embed);
		});

	}

}

module.exports = MemeCommand;