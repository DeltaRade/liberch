import EventEmitter from 'events';
import Discord, {
	Attachment,
	FileOptions,
	Message,
	PermissionResolvable,
	Channel,
	Collection,
	Guild,
} from 'discord.js';
import { PathLike } from 'fs';
declare class Client extends Discord.Client {
	constructor(options: {
		prefix: String;
		ownerID: String;
		commandsDir?: string;
	});
	public commandHandler: CommandHandler;
	protected prefix: String;
	protected ownerID: String;
	public settings: JSONSettingsDB;
	public commandsDir: string;
	public loadEvents(directory: String): void;
	public setSettings(db: JSONSettingsDB): this;
	public reloadCommands(): void;
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
	public constructor({
		name,
		description,
		usage,
		alias,
		cooldown,
		requirePermissions,
		requireUserPermissions,
	}: CommandOptions);
	protected name: String;
	protected alias: Array<String>;
	protected description: String;
	protected usage: String;
	public run(
		fn: (
			client: Client,
			message: Discord.Message,
			args: Array<string>
		) => void
	): this;
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
	public watchDir(directory: PathLike);
	public watchFile(filename: PathLike);
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
declare abstract class SettingsDB {
	abstract get(guildID: string, key: string, defaultVal: any): any;
	abstract set(guildID: string, key: string, value: any): this;
	abstract delete(guildID: string, key: string): this;
	abstract clear(guildID: string): this;
	abstract getAll(guildID: string): { [key: string]: any };
}
declare class JSONSettingsDB extends SettingsDB {
	constructor();
	get(guild: Guild, key: string, defaultVal: any): any;
	set(guild: Guild, key: string, value: any): this;
	delete(guild: Guild, key: string): this;
	clear(guild: Guild): this;
	getAll(guild: Guild): { [key: string]: any };
}

declare type CommandOptions = {
	name: string;
	description?: string;
	usage?: string;
	alias?: string[];
	cooldown?: number;
	requireUserPermissions?: PermissionResolvable[];
	requirePermissions?: PermissionResolvable[];
};
export { Client, Command, Utils, FileWatch, JSONSettingsDB };
