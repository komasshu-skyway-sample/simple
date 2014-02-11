
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , PeerServer = require('peer').PeerServer;

var app = express();

// all environments
app.set('port', process.env.PORT || 3443);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// start https server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express tls server listening on port ' + app.get('port'));
});

// start peer server
var peer_server = new PeerServer({
  port: 9000,
  key: 'peerjs'
});
