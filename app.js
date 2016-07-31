var express  = require('express');
var app = express();
var getGist = require('./routes/gistDownloader.js');

var server = require("http").createServer(app);
// Start server

app.get('/',getGist.gistDownloader);

server.listen(8080, function() {
	console.log("Express server listening on 8083 mode");
});