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

Custom events (accessible via the events property) | listener
---------------------------------------------------|---------
commandError | error:Error
commandInvalid | member:Member, command:String

