
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});




Parse.Cloud.define('pushertest', function(req, res) {

	var Pusher = require('pusher');

	var pusher = new Pusher({
	  appId: '201341',
	  key: '10da7363ffe998a2030c',
	  secret: 'f184be84d27c85f25ad5',
	  encrypted: true
	});

	pusher.trigger('test_channel', 'my_event', {
  		"message": "hello world"
	});

  res.success('pusher hi');
});

var express = require('express');
var bodyParser = require('body-parser');

var Pusher = require('pusher');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var pusher = new Pusher({ appId: '201341', key: '10da7363ffe998a2030c', secret:  'f184be84d27c85f25ad5' });

app.post('/pusher/auth', function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

var port = process.env.PORT || 5000;
app.listen(port);
