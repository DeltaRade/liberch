declare module 'liberch' {
import EventEmitter from 'events'
import Discord, { Attachment, FileOptions } from 'discord.js'
import sqlite3 from 'sqlite3'

export  class Client extends Discord.Client{
    constructor(options:{prefixes:[],ownerID:String,mentionAsPrefix:Boolean, options?:Object});
    protected prefix:Array<String>
    protected ownerID:String
    protected events:_CustomEvents
    public loadCommands(directory:String):void
    public loadEvents(directory:String):void
    public listenForCommands():void;
    public reloadFile(path:String):void
  
} 

export  class Command{
    constructor(options:{name:String,alias:Array<String>})
    
    public execute(client:Client,message:Discord.Message, args:Array<String>):void;
}

export  class Cooldown{
    constructor()

    public add(value:any):void
    public isOnCooldown(value:any):Boolean
    public remove(value:any):void
    public removeAfter(value:any,time:number):void
}

export class _CustomEvents{

    public on(event:'commandError',listener:(error:Error)=>void):this;
    public on(event:'commandInvalid',listener:(member:Discord.GuildMember,command:String)=>void):this;
    
}

export  class FileWatch{
    constructor();
    public watchDir(directory:'string path')
    public watchFile(filename:'pathlike')
    public on(event:'changed',listener:(event:String,file:String)=>void):this
    public on(event:'dirChanged',listener:(event:String,directory:String,file:String)=>void):this
}

export  class TextPrompt{
    constructor(client:Discord.Client);
    protected collector:Discord.MessageCollector
    protected time:number
    public create(message:Discord.Message, msg:String, options:{ time:Number, maxprocess:Number, maxcollect:Number }):void
    public on(event:'collect',listener:(message:Discord.Message)=>void):this
    public on(event:'end',listener:(collection:Discord.Collection<any,any>)=>void):this
}

export  class ReactionPrompt{
    constructor(client:Discord.Client);
    protected collector:Discord.MessageCollector
    protected time:number
    public create(message:Discord.Message, msg:String, options:{ time:Number,emojisToCollect:[], filterID:String, maxprocess:Number, maxcollect:Number }):void
    public on(event:'collect',listener:(reaction:Discord.MessageReaction)=>void):this
    public on(event:'end',listener:(collection:Discord.Collection<any,any>)=>void):this
}

export  class SQLite3 {
    constructor(client:Client,filename:String)
    protected database:sqlite3.Database

    public createTable(tablename:String,values:[]):void
    public insert(tablename:String,columns:[],values:[]):void
    public get(tablename:string,column:String,value:String,callback:(row:[])=>void):void
    public close():void
    public on(event:'connected',listener:()=>void):this
    public on(event:'error',listener:(error:Error)=>void):this
    
}

export  class Utils{

    public static findMembersMatch(guild:Discord.Guild, name:String):Array<Discord.GuildMember>
    public static findChannelsMatch(guild:Discord.Guild, channelName:String):Array<Discord.Channel>
    public static findEmojisMatch(guild:Discord.Guild, emojiName:String):Array<Discord.Emoji>
    public static findRolesMatch(guild:Discord.Guild, roleName:String):Array<Discord.Role>
    
    public permissionsFlags():Array<String>
    public permissionNumberToFlag(number:number):Array<String>
    public static msToTime(value:Number):String
}

}