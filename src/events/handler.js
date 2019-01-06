const fs = require('fs');

class EventHandler {
	constructor(client) {
		this.client = client;
	}

	init(directory) {
		const eventsFiles = fs.readdirSync(directory).filter(file=>file.endsWith('.js'));
		for (const file of eventsFiles) {
			// const f = require('../../tests/events/test');
			// console.log(f);
			const event = require(`../../../${directory}/${file}`);
			const eventname = file.split('.')[0];
			// console.log(obj);
			this.client.on(eventname, event.bind(null, this.client));
			delete require.cache[require.resolve(`../../../${directory}/${file}`)];
		}
	}
}

module.exports = EventHandler;