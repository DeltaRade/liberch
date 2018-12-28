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

export declare class TextPrompt{
    constructor(client:Discord.Client);
    protected collector:Discord.MessageCollector
    protected time:number
    create(message:Discord.Message, msg:String, options = { time:Number, maxprocess:Number, maxcollect:Number }):void
    onCollect(m:Discord.Message)
    onEnd(collection:Discord.Collection)
}

export declare class ReactionPrompt{
    constructor(client:Discord.Client);
    protected collector:Discord.MessageCollector
    protected time:number
    create(message:Discord.Message, msg:String, options = { time:Number,emojisToCollect:[], filterID:String, maxprocess:Number, maxcollect:Number }):void
    onCollect(r:Discord.MessageReaction)
    onEnd(collection:Discord.Collection)
}