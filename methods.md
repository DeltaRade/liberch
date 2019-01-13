# Client

Method | return type
-------|------------
reloadFile | none
loadCommands | none
loadEvents | none

properties | return type
-----------|------------
prefixes | Array [] 
ownerID | String

Custom events | listener
--------------|---------
commandError | error:Error
commandInvalid | member:Member, command:String

*note: Custom Events are accessible via the events property

# Commands

Method | arguments
-------|----------
execute | client:Client,message:Message, args:Array[arguments]

# Cooldown

Method | arguments | returns
-------|-----------|--------
add | value:any | none
isOnCooldown | none | none
remove | value:any | none
removeAfter | value:any, time:number | none

# FileWatch

Method | arguments | returns
-------|-----------|--------
watchDir | directory:String (path) | none
watchFile | filename:String (path) | none

Event | arguments
------|----------
changed | event:String, file:String
dirChanged | event:String, directory:String, file:String
