import EventEmitter from 'events';
import Discord, { Attachment, FileOptions, Message } from 'discord.js';
declare class Client extends Discord.Client {
	constructor(options: {
		prefixes: [];
		ownerID: String;
		mentionAsPrefix: Boolean;
	});
	protected commandHandler: CommandHandler;
	protected prefixes: Array<String>;
	protected ownerID: String;
	public loadEvents(directory: String): void;
	//public reloadCommand(path:String):void
}
declare class CommandHandler {
	public constructor(client: Discord.Client);
	protected commands: Discord.Collection<string, Command>;
	protected cooldowns: Map<string, Cooldown>;
	public load(directory: string): void;
	public handle(message: Discord.Message): void;

	public on(event: 'commandError', listener: (error: Error) => void): this;
	public on(
		event: 'commandInvalid',
		listener: (member: Discord.GuildMember, command: String) => void
	): this;
}
declare class Command {
	public constructor(options: {
		name: String;
		description: String;
		usage: String;
		alias: Array<String>;
		cooldown: number;
	});
	protected name: String;
	protected alias: Array<String>;
	protected description: String;
	protected usage: String;
	public setExecute(
		fn: (message: Discord.Message, args: Array<string>) => void
	): void;
	public execute(message: Discord.Message, args: Array<String>): this;
}

declare class Cooldown {
	constructor();
	protected size: number;
	public add(key: any, value: any): this;
	public has(key: any): Boolean;
	public delete(key: any): this;
	public deleteAfter(key: any, time: number): void;
	public get(key: any): any;
	public array(): Array<[any, any]>;
}

declare class FileWatch {
	constructor();
	public watchDir(directory: 'string path');
	public watchFile(filename: 'pathlike');
	public on(
		event: 'changed',
		listener: (event: String, file: String) => void
	): this;
	public on(
		event: 'dirChanged',
		listener: (event: String, directory: String, file: String) => void
	): this;
}

declare class TextPrompt {
	constructor(client: Discord.Client);
	protected collector: Discord.MessageCollector;
	protected time: number;
	protected lastCollected: Discord.Message;
	public create(
		message: Discord.Message,
		msg: String,
		options: { time: Number; maxprocess: Number; maxcollect: Number }
	): void;
	public on(
		event: 'collect',
		listener: (message: Discord.Message) => void
	): this;
	public on(
		event: 'end',
		listener: (collection: Discord.Collection<any, any>) => void
	): this;
}

declare class ReactionPrompt {
	constructor(client: Discord.Client);
	protected collector: Discord.MessageCollector;
	protected time: number;
	protected lastCollected: Discord.MessageReaction;
	public create(
		message: Discord.Message,
		msg: String,
		options: {
			time: Number;
			emojisToCollect: [];
			filterID: String;
			maxprocess: Number;
			maxcollect: Number;
		}
	): void;
	public on(
		event: 'collect',
		listener: (reaction: Discord.MessageReaction) => void
	): this;
	public on(
		event: 'end',
		listener: (collection: Discord.Collection<any, any>) => void
	): this;
}

declare class Utils {
	public static containsInvite(string: String): Boolean;
	public static findMembersMatch(
		guild: Discord.Guild,
		name: String
	): Array<Discord.GuildMember>;
	public static findChannelsMatch(
		guild: Discord.Guild,
		channelName: String
	): Array<Discord.Channel>;
	public static findEmojisMatch(
		guild: Discord.Guild,
		emojiName: String
	): Array<Discord.Emoji>;
	public static findRolesMatch(
		guild: Discord.Guild,
		roleName: String
	): Array<Discord.Role>;

	public permissionsFlags(): Array<String>;
	public permissionNumberToFlag(number: number): Array<String>;
	public static msToTime(value: Number): String;
}

export { Client, Command, Utils, FileWatch };
