//check for new mail
var Imap = require('imap'),
    inspect = require('util').inspect;
var colors = require('colors');

var accounts = [{user : 'alex@ark.com', pass: '***************', lastUid: 0}];
var imap;

setInterval(function () {
	console.log('checking new email for '.green + accounts[0].user.toString().green);
	imap = new Imap({
      user: accounts[0].user,
      password: accounts[0].pass,
      host: 'imap.gmail.com',
      port: 993,
      secure: true
    });

	openInbox(function(err, mailbox) {
		var currentMax = 0;
		var message = '';
		var from = '';
	  if (err) die(err);
	  imap.search([ 'UNSEEN' ], function(err, results) {
	    if (err) die(err);
	    imap.fetch(results,
	      { headers: ['from', 'to', 'subject', 'date'],
	        cb: function(fetch) {
	          fetch.on('message', function(msg) {
	            
	            msg.on('headers', function(hdrs) {
	            	if (currentMax < msg.uid){
	              		currentMax = msg.uid;
	              		message = hdrs['subject'].toString();
	              		from = hdrs['from'].toString();
	              	} 
	            });
	            msg.on('end', function() {
	              console.log('Finished message no. ' + msg.uid);

	            });
	          });
	        }
	      }, function(err) {
	        if (err) throw err;
	        console.log('Done fetching all messages!');
	        if (accounts[0].lastUid == 0){
	        	console.log('setting a new max ID'.green);
	        	accounts[0].lastUid = currentMax;
	        }
	        if (accounts[0].lastUid < currentMax) {
	        	console.log('NEW MESSAGE!  '.red + message.red + ' from ' + from);
	        	accounts[0].lastUid = currentMax;
	        }
	        imap.logout();
	      }
	    );
	  });
	});
}, 30000);


function openInbox(cb) {
  imap.connect(function(err) {
    if (err) die(err);
    imap.openBox('INBOX', true, cb);//[Gmail]/All Mail
  });
}

function die(err) {
  console.log('Uh oh: ' + err);
  process.exit(1);
}