class Cooldown {
	constructor() {
		this._cooldown = new Set();
	}
	add(value) {
		this._cooldown.add(value);
	}

	isOnCooldown(value) {
		return this._cooldown.has(value);
	}

	remove(value) {
		this._cooldown.delete(value);
	}
}

module.exports = Cooldown;