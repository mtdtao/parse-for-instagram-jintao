
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '201341',
  key: '10da7363ffe998a2030c',
  secret: 'f184be84d27c85f25ad5',
  encrypted: true
});


Parse.Cloud.define('pushertest', function(req, res) {
	pusher.trigger('test_channel', 'my_event', {
  		"message": "hello world"
	});

  res.success('pusher hi');
});