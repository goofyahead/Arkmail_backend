var conversations = require('./routes/conversations.js');
var pushNotifications = require('./routes/pushNotifications.js');
var express = require('express');
var colors = require('colors');

var app = express();
app.use(express.bodyParser());

var PORT = 80;

app.get('/arkmail/hello', function(req, res){
  res.send('hello world');
});

// GET PETITIONS
app.get('/arkmail/conversations', conversations.retrieveConversations);
//TEST
app.get('/arkmail/testpush', pushNotifications.sendMessage);

// POST PETITIONS
app.post('/arkmail/register', pushNotifications.registerDevice);

app.listen(PORT);
console.log('ArkMail listening on '.green + PORT);
// conversations.retrieveConversations(yahooCredentials, configYahoo);