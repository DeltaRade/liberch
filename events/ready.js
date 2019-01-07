const frame = require('../oversimple');
/**
 * @param {frame.Client} client
 */
module.exports = (client)=>{
	console.log('ready ' + client.user.username);
	client.user.setActivity('testing');

};