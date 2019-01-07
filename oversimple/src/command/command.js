class Command {
	constructor(options = { name:undefined, alias: [], cooldown:0 }) {
		if(options.name === undefined) {
			throw new Error('NAME_NOT_DEFINED');
		}

		this.name = options.name;
		this.alias = options.alias;
		this.cooldown = options.cooldown;
	}


	execute() {
		throw new Error('NOT_IMPLEMENTED');
	}
}

module.exports = Command;