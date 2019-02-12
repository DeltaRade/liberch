declare module 'liberch' {
import EventEmitter from 'events'
import Discord, { Attachment, FileOptions, Message } from 'discord.js'
import sqlite3 from 'sqlite3'
import pg from 'pg'
export  class Client extends Discord.Client{
    constructor(options:{prefixes:[],ownerID:String,mentionAsPrefix:Boolean});
    protected commands:{}
    protected prefixes:Array<String>
    protected ownerID:String
    protected events:_CustomEvents
    public disableDefaultHelpCommand():void
    public loadCommands(directory:String):void
    public loadEvents(directory:String):void
    public reloadCommand(path:String):void
} 

export  class Command{
    constructor(options:{name:String,description:String,usage:String,alias:Array<String>})
    protected name:String;
    protected alias:Array<String>
    protected description:String;
    protected usage:String
    public execute(client:Client,message:Discord.Message, args:Array<String>):any;
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
    protected lastCollected:Discord.Message
    public create(message:Discord.Message, msg:String, options:{ time:Number, maxprocess:Number, maxcollect:Number }):void
    public on(event:'collect',listener:(message:Discord.Message)=>void):this
    public on(event:'end',listener:(collection:Discord.Collection<any,any>)=>void):this
}

export  class ReactionPrompt{
    constructor(client:Discord.Client);
    protected collector:Discord.MessageCollector
    protected time:number
    protected lastCollected:Discord.MessageReaction
    public create(message:Discord.Message, msg:String, options:{ time:Number,emojisToCollect:[], filterID:String, maxprocess:Number, maxcollect:Number }):void
    public on(event:'collect',listener:(reaction:Discord.MessageReaction)=>void):this
    public on(event:'end',listener:(collection:Discord.Collection<any,any>)=>void):this
}

export class PostgreSQL{
    constructor(options = { user:'', password:'', database:'', port:0, connectionString:'', ssl:any, types:any, statement_timeout:0 })
    protected client:pg.Client
    public connect():Promise<void>
    public end():Promise<void>
    public get(table:String,column:String,value:any):Promise<pg.QueryResult>
    public upsert(table:String,columns:String[],values:any[], constraint:String,columnToUpdate:String,valueToUpdate:any):Promise<any>
    public query(query:String):Promise<any>
    public createTable(tablename:String,columns:Array<String>,unique:String):Promise<any>
    public insertOrIgnore(table:String, columns:String[], values:any[])
}

export class SQLite3 {
    constructor(filename:String)
    protected database:sqlite3.Database

    public createTable(tablename:String,values:[]):Promise<void>
    public insertReplace(tablename:String,columns:[],values:[]):Promise<void>
    public insertIgnore(tablename:String,columns:[],values:[]):Promise<void>
    public get(tablename:string,column:String,value:String):Promise<Object>
    public update(tablename:String,column:String,value:any,rowIdentifier:String,rowValue:any):Promise<void>
    public close():Promise<void>
    public on(event:'connected',listener:()=>void):this
    public on(event:'error',listener:(error:Error)=>void):this
    
}

export  class Utils{

    public static containsInvite(string:String):Boolean
    public static findMembersMatch(guild:Discord.Guild, name:String):Array<Discord.GuildMember>
    public static findChannelsMatch(guild:Discord.Guild, channelName:String):Array<Discord.Channel>
    public static findEmojisMatch(guild:Discord.Guild, emojiName:String):Array<Discord.Emoji>
    public static findRolesMatch(guild:Discord.Guild, roleName:String):Array<Discord.Role>
    
    public permissionsFlags():Array<String>
    public permissionNumberToFlag(number:number):Array<String>
    public static msToTime(value:Number):String
}

}