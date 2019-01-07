const fs = require('fs');
const events = require('events');
class FileWatch extends events.EventEmitter {
	constructor() {
		super();
	}
	watchFile(filepath) {
		let fsWait = false;
		fs.watch(filepath, (event, file)=>{
			if (file) {
				if (fsWait) return;
				fsWait = setTimeout(() => {
					fsWait = false;
				}, 1000);
				this.emit('changed', event, file);

			}
		});

	}
	watchDir(dir) {
		let fsWait = false;

		fs.watch(dir, (event, file)=>{
			if (file) {
				if (fsWait) return;
				fsWait = setTimeout(() => {
					fsWait = false;
				}, 1000);
				this.emit('dirChanged', event, dir, file);
			}

		});
	}

	reloadFile(path) {

		delete require.cache[require.resolve(`../../../${path}`)];
	}
}

module.exports = FileWatch;