var agent = require('./headers')
  , device = require('./device');
var colors = require('colors');
var gcm = require('node-gcm');

// create a message with default values
var message = new gcm.Message();

// or with object values
var message = new gcm.Message({
    collapseKey: 'demoa',
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
        key1: 'message1',
        key2: 'message2'
    }
});

var sender = new gcm.Sender('AIzaSyDhXsg1aVauF1neYyulyCQa6A9A67zO6k0');
var registrationIds = ['APA91bGoEd9FZvKQGGMcEymJw3Aovf534Bj6Y5C3w0HR7bSYF57ggPxdCfZkDF3jmGqa5kQYXc_0Vp8NccMJfXoxqDA9YS14UXZDgWTs0ErIHf_7UQp7CyBSMhnzn_LjqcCUaXVW4oVK33PSP8xbABINI0Z8JL2NVw'];


sender.send(message, registrationIds, 4, function (err, result) {
     console.log(result);
});

exports.registerDevice = function(req, res) {
	
}

exports.sendMessage = function(req,res){
	agent.createMessage()
	  .device(device)
	  .alert('Hello Jacy, you have 3 new messages!')
	  .set('msg_id', 12345)
  	  .set('msg_title', 'Important sneeze!')
  	  .badge(3)
	  .send();

	  console.log('message sent'.red);
	  res.send(200);
}