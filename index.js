// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var S3Adapter = require('parse-server').S3Adapter;

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

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://heroku_gmvhctw6:74rnvh56s3vv1floaodmsoveof@ds021771.mlab.com:21771/heroku_gmvhctw6',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'instagram',
  masterKey: process.env.MASTER_KEY || 'asdSDLFNk3lKFNID()@#)#(@!@$N!@!@rf', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'https://instagram-jintao.herokuapp.com/parse',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  },
  filesAdapter: new S3Adapter(
    "AKIAJSQW5YHTAZOPM47Q",
    "NxoZYosZZrCuJG3bEg3DvgofCWWRNnHxtdYdfKdp",
    "instagram-jintao",
    {directAccess: true}
  )
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('Make sure to star the parse-server repo on GitHub!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
