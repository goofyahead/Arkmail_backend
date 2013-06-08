//mongo db retrieve docs with configs if not found request, if works store.
var regex = /^[A-Z0-9._%+-]+@([A-Z0-9.-]+\.[A-Z]{2,4})$/i;
var configs = {};
configs['gmail.com'] = {box: ['[Gmail]/All Mail'], host : 'imap.gmail.com', port : '993', secure : true};
configs['yahoo.com'] =  {box: [], host : 'imap.mail.yahoo.com', port : '993', secure : true};
configs['aol.com'] =  {box: [], host : 'imap.aol.com', port : '993', secure : true};

exports.getConfig = function (mail) {
	console.log('retrieving config for ' + mail.toString().yellow);
	return configs[ mail.match(regex)[1] ];
}

exports.getBoxes = function ( imap, mail, config, cb) {
	console.log('checking ' + mail);
	var domain = mail.match(regex)[1];
	if ( domain == 'yahoo.com'){
		console.log('checking yahoo!');
		imap.connect(function(err) {
			imap.getBoxes(function (err, boxes){
				// console.log(boxes);
		    	for (var key in boxes) {
		    		if (key != 'Bulk Mail' && key != 'Y! Conversations' && key != 'Trash') config.box.push(key);
		    		// if (key == 'Draft') config.box.push(key);
		    	}
		    	console.log(config.box);
		    	cb();
	   		});
	   		imap.logout();
		});
	} else if ( domain == 'aol.com'){
		console.log('checking aol!');
		imap.connect(function(err) {
			imap.getBoxes(function (err, boxes){
		    	for (var key in boxes) {
		    		if (key != 'Spam')config.box.push(key);
		    	}
		    	console.log(config.box);
		    	cb();
	   		});
	   		imap.logout();
		});
	} else {
		console.log('standard');
		config.box = configs['gmail.com'].box;
		cb();
	}
}