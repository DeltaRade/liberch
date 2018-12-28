class Command {
	constructor(options = { name:undefined, alias: [] }) {
		if(options.name === undefined) {
			throw new Error('NAME_NOT_DEFINED');
		}

		this.name = options.name;
		this.alias = options.alias;
	}


	execute() {
		throw new Error('NOT_IMPLEMENTED');
	}
}

module.exports = Command;