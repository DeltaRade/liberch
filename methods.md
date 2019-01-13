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

**note: Custom Events are accessible via the events property
