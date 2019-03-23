class Cooldown extends Map {
	constructor() {
		super()
	}
	add(key,value) {
		return super.set(key,value);
	}

	has(key) {
		return super.has(key);
	}

	get(key){
		return super.get(key)
	}

	delete(key) {
		super.delete(key);
		return this
	}

	deleteAfter(key, time) {
		setTimeout(() => {
			this.delete(key);
		}, time);
	}
	array(){
		return Array.from(this)
	}
}

module.exports = Cooldown;