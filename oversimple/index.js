const Client = require('./src/client/object');
const Command = require('./src/command/command');
const prompt = require('./src/prompt/prompt');
const Utils = require('./src/utils/utils');
const FileWatch = require('./src/filewatch/filewatch');
const SQLite3 = require('./src/sqlite/sqlite');
const Cooldown = require('./src/cooldowns/cooldown');
module.exports = {
	Client:Client,
	Command:Command,
	Cooldown:Cooldown,
	TextPrompt:prompt.TextPrompt,
	ReactionPrompt:prompt.ReactionPrompt,
	Utils:Utils,
	FileWatch:FileWatch,
	SQLite3:SQLite3,
};