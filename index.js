const Client = require('./src/client/client');
const Command = require('./src/command/command');
const prompt = require('./src/prompt/prompt');
const Utils = require('./src/utils/utils');
const FileWatch = require('./src/filewatch/filewatch');
const Cooldown = require('./src/cooldowns/cooldown');
const JSONSettingsDB = require('./src/providers/jsonProvider');
module.exports = {
	Client,
	Command,
	Cooldown,
	TextPrompt: prompt.TextPrompt,
	ReactionPrompt: prompt.ReactionPrompt,
	Utils,
	FileWatch,
	JSONSettingsDB,
};
