import EventEmitter from 'events'
import Discord from 'discord.js'
import sqlite3 from 'sqlite3'
export declare class Client extends Discord.Client{
    constructor(options:{prefixes:[],ownerID:String,mentionAsPrefix:Boolean, options?:Object});
    constructor(options:{prefixes:[]});
    protected prefix:Array<String>
    protected ownerID:String
    protected events:_CustomEvents
    public loadCommands(directory:String):void
    public loadEvents(directory:String):void
    public listenForCommands():void;
    public reloadFile(path:String):void
  
} 

export declare class Command{
    constructor(options:{name:String})
    constructor(options:{name:String,alias:Array<String>})
    
    public execute(client:Client,message:Discord.Message, args:Array<String>):void;
}

export declare class Cooldown{
    constructor()

    public add(value):void
    public isOnCooldown(value):Boolean
    public remove(value):void
}

export declare class _CustomEvents{

    public on(event:'commandError',listener:(error:Error)=>void):this;
    public on(event:'commandInvalid',listener:(member:Discord.GuildMember,command:String)=>void):this;
    public on(event:'eventError',listener:(file:String,err:Error)=>void):this
}

export declare class FileWatch{
    constructor();
    public watchDir(directory:'string path')
    public watchFile(filename:'pathlike')
    public on(event:'changed',listener:(event:String,file:String)=>void):this
    public on(event:'dirChanged',listener:(event:String,directory:String,file:String)=>void):this
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

export declare class SQLite3 {
    constructor(client:Client,filename:String)
    protected database:sqlite3.Database

    public createTable(tablename:String,values:[]):void
    public insert(tablename:String,columns:[],values:[]):void
    public get(tablename:string,column:String,value:String,callback:(row:[])=>void):void
    public close():void
    public on(event:'connected',listener:()=>void):this
    public on(event:'error',listener:(error:Error)=>void):this
    
}

export declare class Utils{

    public static findMembersMatch(guild:Discord.Guild, name:String):Array<Discord.GuildMember>
    public static findChannelsMatch(guild:Discord.Guild, channelName:String):Array<Discord.Channel>
    public static findEmojisMatch(guild:Discord.Guild, emojiName:String):Array<Discord.Emoji>
    public static findRolesMatch(guild:Discord.Guild, roleName:String):Array<Discord.Role>
}
