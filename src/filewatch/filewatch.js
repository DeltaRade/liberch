const fs = require('fs');
const events = require('events');
class FileWatch extends events.EventEmitter {
	constructor() {
		super();
	}
	watchFile(filepath) {
		let fsWait = false;
		fs.watch(filepath, (event, file)=>{
				if (fsWait) return;
				// @ts-ignore
				fsWait = setTimeout(() => {
					fsWait = false;
				}, 1000);
				this.emit('changed', event, file);
		});

	}
	watchDir(dir) {
		let fsWait = false;
		fs.watch(dir, (event, file)=>{
				if (fsWait) return;
				// @ts-ignore
				fsWait = setTimeout(() => {
					fsWait = false;
				}, 1000);
				this.emit('dirChanged', event, dir, file);
		});
	}

}

module.exports = FileWatch;