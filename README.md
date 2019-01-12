# liberch
It is A framework for Discord.js
**Features
-command and event handler
-utility functions
-file reload
and other stuff**

# Installation 
`npm install https://github.com/DeltaRade/liberch`

# Example code
```js
const liberch=require('liberch');
const client=new liberch.Client({prefixes:['\\/'],ownerID:'',mentionAsPrefix:false})
client.loadCommands('commands')
client.listenForCommands()
client.loadEvents('events')

client.login('token')```

def
