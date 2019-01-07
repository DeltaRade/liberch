const events = require('events');
class _CustomEvents extends events.EventEmitter {
	constructor() {
		super();
	}

}


module.exports = _CustomEvents;