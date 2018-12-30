import EventEmitter from 'events'
import Discord from 'discord.js'

export declare class Client extends Discord.Client{
    constructor(options:{prefix:String,mentionAsPrefix:Boolean, options?:Object});
    constructor(options:{prefix:String});
    protected prefix:String;
    protected customEvents:_CustomEvents
    public loadCommands(directory:String):void
    public listenForCommands():void;
    public init(token:String):void
    public reloadFile(path:String):void
  
} 

export declare class Command{
    constructor(options:{name:String,alias:Array<String>})
    constructor(options:{name:String})
    
    public execute(message:Discord.Message, args:Array<String>):void;
}


export declare class _CustomEvents{

    public on(event:'commandError',listener:(error:Error)=>void):this;
    public on(event:'commandInvalid',listener:(command:String)=>void):this;
}

export declare class FileWatch extends EventEmitter{
    constructor();
    public watchDir(directory:'string path')
    public watchFile(filename:'pathlike')
    public on(event:'changed',listener:(event:String,file:String)=>void):this
}

export declare class TextPrompt{
    constructor(client:Discord.Client);
    protected collector:Discord.MessageCollector
    protected time:number
    public create(message:Discord.Message, msg:String, options:{ time:Number, maxprocess:Number, maxcollect:Number }):void
    public onCollect(m:Discord.Message):void
    public onEnd(collection:Discord.Collection<any,any>):void
}

export declare class ReactionPrompt{
    constructor(client:Discord.Client);
    protected collector:Discord.MessageCollector
    protected time:number
    public create(message:Discord.Message, msg:String, options:{ time:Number,emojisToCollect:[], filterID:String, maxprocess:Number, maxcollect:Number }):void
    public onCollect(r:Discord.MessageReaction):void
    public onEnd(collection:Discord.Collection<any,any>):void
}

export declare class Utils{

    public static findMembersMatch(guild:Discord.Guild, name:String):Array<Discord.GuildMember>
    public static findChannelsMatch(guild:Discord.Guild, channelName:String):Array<Discord.Channel>
    public static findEmojisMatch(guild:Discord.Guild, emojiName:String):Array<Discord.Emoji>
    public static findRolesMatch(guild:Discord.Guild, roleName:String):Array<Discord.Role>
}
