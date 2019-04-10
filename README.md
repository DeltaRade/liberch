# liberch
It is a framework for Discord.js
- [liberch](#liberch)
- [Installation](#installation)
- [Example code](#example-code)
  - [Client](#client)
  - [Commands](#commands)
  - [Events](#events)


**Features:**
  * **command and event handler**
  * **utility functions**
  * **command  reload**
  * **and other stuff**

# Installation 
`npm install https://github.com/DeltaRade/liberch`

# Example code

## Client
```javascript
const liberch=require('liberch');
const client=new liberch.Client({prefixes:['/',';'],ownerID:'',mentionAsPrefix:false});
client.commandHandler.load('commands');
client.loadEvents('events');

client.login('token') 
```
## Commands
```javascript
const liberch=require('liberch');
let say=new liberch.Command({name:'say',alias:['s']})
say.setExecute((message,args)=>{
    message.delete()
    message.channel.send(args.join(' '))
  })
 module.exports=say
 ```

## Events
`events/ready.js`
```js
module.exports=(client)=>{
  console.log(`ready ${client.user.username}`)
}
```
 # links
 [**example bot**](https://github.com/DeltaRade/Anzeo)