# liberch
It is A framework for Discord.js

**Features**
  * **command and event handler**
  * **utility functions**
  * **file reload**
  * **and other stuff**

# Installation 
`npm install https://github.com/DeltaRade/liberch`

# Example code

## Client
```javascript
const liberch=require('liberch');
const client=new liberch.Client({prefixes:['\\/'],ownerID:'',mentionAsPrefix:false});
client.loadCommands('commands');
client.listenForCommands();
client.loadEvents('events');

client.login('token') 
```
## Commands
```javascript
const liberch=require('liberch');
class SayCommand  extends liberch.Command{
  constructor(){
    super('say',['s'])
  }
  execute(client,message,args){
    message.delete()
    message.channel.send(args.join(' '))
  }
 }
 module.exports=KickCommand
 ```
