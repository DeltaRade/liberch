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

declare class ArgumentsCollector {
	constructor(args: Argument[]);
	public async obtain(
		message: Message
	): { values: { [key: string]: any }; canceled: boolean };
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
declare class JSONSettings extends SettingsDB {
	constructor();
	get<T>(guild: Guild, key: string, defaultVal: T): T;
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

declare type Argument = {
	key: string;
	prompt: string;
	type: ArgumentTypes;
	default?: string;
	time?: number;
	attempts?: number;
	errorMsg?: string;
};

declare type ArgumentTypes = 'channel' | 'user' | 'member' | 'role' | 'string';
export {
	Client,
	Command,
	Utils,
	FileWatch,
	JSONSettingsDB,
	ArgumentsCollector,
};
