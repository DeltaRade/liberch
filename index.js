const Client = require('./src/client/object');
const Command = require('./src/command/command');
const prompt = require('./src/prompt/prompt');
module.exports = {
	Client:Client,
	Command:Command,
	TextPrompt:prompt.TextPrompt,
	ReactionPrompt:prompt.ReactionPrompt,
};