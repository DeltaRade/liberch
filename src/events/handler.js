const Discord = require('discord.js');
const fs = require('fs');

class EventHandler {
	constructor(client) {
		this.client = client;
		this.events = new Discord.Collection();
	}

	init(directory) {
		const eventsFiles = fs.readdirSync(directory).filter(file=>file.endsWith('.js'));
		for (const file of eventsFiles) {
			// const f = require('../../tests/events/test');
			// console.log(f);
			const event = require(`../../${directory}/${file}`);
			const obj = new event();
			// console.log(obj);
			this.events.set(obj.id, obj);
		}
	}
}