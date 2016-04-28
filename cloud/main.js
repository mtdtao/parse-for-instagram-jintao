
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

Parse.Cloud.define('authorizePusherChannel', function (request, response) {
	if (!request.user) { response.error('User should be autenticated.'); }
	var pusherAppKey = 'your-pusher-app-key';
	var pusherAppSecret = 'your-pusher-app-secret';
	var stringToSign = request.params.socketid + ':' + request.params.channelname;
	var authToken = pusherAppKey + ':' + crypto.createHmac('sha256', pusherAppSecret).update(stringToSign).digest('hex');
	response.success(JSON.stringify({auth:authToken}));
});
