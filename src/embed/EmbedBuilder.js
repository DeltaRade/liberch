const Discord = require('discord.js');

class EmbedBuilder {
	constructor() {
		this.embed = new Discord.RichEmbed();
	}

	attachFile(file) {
		this.embed.attachFile(file);
	}

	attachFiles(files) {
		this.embed.attachFiles(files);
	}

	addField(name, val, inline) {
		this.embed.addField(name, val, inline);
	}

	addBlankField(inline) {
		this.embed.addBlankField(inline);
	}

	setAuthor(name, icon, url) {
		this.embed.setAuthor(name, icon, url);
	}

	setColor(color) {
		this.embed.setColor(color);
	}

	setDesc(str) {
		this.embed.setDescription(str);
	}

	setFooter(text, icon) {
		this.embed.setFooter(text, icon);
	}

	setImg(url) {
		this.embed.setImage(url);
	}

	setThumbnail(url) {
		this.embed.setThumbnail(url);
	}

	setTitle(str) {
		this.embed.setTitle(str);
	}


	build() {
		return this.embed;
	}

}

module.exports = EmbedBuilder;