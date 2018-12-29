import EventEmitter from 'events'
import Discord from 'discord.js'
import { create } from 'domain';

export declare class Client extends Discord.Client{
    constructor(options:{prefix:String,mentionAsPrefix:Boolean, options?:Object});
    constructor(options:{prefix:String});
    protected prefix:String;
    loadCommands(directory:String):void
    listenForCommands():void;
    init(token:String):void
} 

export declare class Command{
    constructor(options:{name:String,alias:Array<String>})
    constructor(options:{name:String})
    
    execute(message:Discord.Message, args:Array<String>):void;
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
    public create(message:Discord.Message, msg:String, options = { time:Number, maxprocess:Number, maxcollect:Number }):void
    public onCollect(m:Discord.Message):void
    public onEnd(collection:Discord.Collection):void
}

export declare class ReactionPrompt{
    constructor(client:Discord.Client);
    protected collector:Discord.MessageCollector
    protected time:number
    public create(message:Discord.Message, msg:String, options = { time:Number,emojisToCollect:[], filterID:String, maxprocess:Number, maxcollect:Number }):void
    public onCollect(r:Discord.MessageReaction):void
    public onEnd(collection:Discord.Collection):void
}

export declare class Utils{

    static public findMembersMatch(message:Discord.Message, name:String):Array<Discord.GuildMember>
}
